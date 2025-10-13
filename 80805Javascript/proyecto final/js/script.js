let orderCount = 1;
let orders = [];


document.addEventListener('DOMContentLoaded', () => {
    const orderModal = document.querySelector('section.modal'); 
    const closeModal = orderModal.querySelector('.modal__close'); 
    const addButton = document.querySelector('.addButton');
    const mainContainer = document.querySelector('.Main-section'); 
    const productSelect = orderModal.querySelector('#product-select');
    const quantitySelect = orderModal.querySelector('#pet-select');
    const activeCounter = document.querySelector('#active-counter');
    const completedCounter = document.querySelector('#completed-counter');
    const cancelModalBtn = orderModal.querySelector('.modal__close-btn');

    
    initializeApp(orderModal, mainContainer, activeCounter, completedCounter);

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        orderModal.classList.add('modal--show');
    });

    cancelModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    orderModal.classList.remove('modal--show');
});

    closeModal.addEventListener('click', (e) => {
        handleCreateOrder(e, orderModal, productSelect, quantitySelect, mainContainer);
    });

    mainContainer.addEventListener('click', (e) => {
        handleCompleteOrder(e, mainContainer, activeCounter, completedCounter);
    });
});

function initializeApp(orderModal, mainContainer, activeCounter, completedCounter) {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
        orders = JSON.parse(storedOrders);
        renderOrders(mainContainer, activeCounter, completedCounter);
    }
    
    if (orders.length > 0) {
        const lastOrder = orders[orders.length - 1];
        orderCount = lastOrder.id + 1;
    }
    
    // **Asegurarse de que el modal esté inicialmente oculto (CSS es crucial aquí)**
    orderModal.classList.remove('modal--show');
}

function renderOrders(mainContainer, activeCounter, completedCounter) {
    const cards = mainContainer.querySelectorAll('.order-card');
    cards.forEach(card => card.remove());
    
    let activeCount = 0;
    let completedCount = 0;

    orders.forEach(order => {
        if (order.status === 'ACTIVO') {
            activeCount++;
            createCardElement(order, mainContainer); 
        } else {
            completedCount++;
        }
    });

    activeCounter.textContent = activeCount;
    completedCounter.textContent = completedCount;
}

function createCardElement(order, mainContainer) {
    const newOrderCard = document.createElement('div');
    newOrderCard.classList.add('order-card');
    newOrderCard.setAttribute('data-order-id', order.id);
    
    newOrderCard.innerHTML = `
        <div class="card__header">
            <h3>Pedido #${order.id}</h3>
            <span class="card__status active-status">${order.status}</span>
        </div>
        <div class="card__body">
            <p><strong>Producto:</strong> ${order.productText}</p>
            <p><strong>Cantidad:</strong> ${order.quantityText} unidad(es)</p>
        </div>
        <button class="card__complete-btn">Marcar como Completado</button>
    `;
    
    const headerElement = mainContainer.querySelector('h3');
    mainContainer.insertBefore(newOrderCard, headerElement.nextSibling);
}

function handleCreateOrder(e, orderModal, productSelect, quantitySelect, mainContainer) {
    e.preventDefault();
    
    const selectedProductValue = productSelect.value;
    const selectedQuantityText = quantitySelect.options[quantitySelect.selectedIndex].text;
    const productText = productSelect.options[productSelect.selectedIndex].text;
    
    if (!selectedProductValue || quantitySelect.value === "") {
        alert('Por favor, seleccione un producto y una cantidad antes de crear el pedido.');
        return; 
    }
    
    const newOrder = {
        id: orderCount,
        productValue: selectedProductValue,
        productText: productText,
        quantityText: selectedQuantityText,
        status: 'ACTIVO',
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    orderCount++;

    renderOrders(mainContainer, document.querySelector('#active-counter'), document.querySelector('#completed-counter')); 

    productSelect.selectedIndex = 0;
    quantitySelect.selectedIndex = 0;
    orderModal.classList.remove('modal--show');
}

function handleCompleteOrder(e, mainContainer, activeCounter, completedCounter) {
    if (e.target.classList.contains('card__complete-btn')) {
        
        const cardToComplete = e.target.closest('.order-card');
        const orderId = parseInt(cardToComplete.getAttribute('data-order-id'));
        if (!cardToComplete) return; 

        const orderIndex = orders.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            orders[orderIndex].status = 'COMPLETADO';
            localStorage.setItem('orders', JSON.stringify(orders));
        }

        cardToComplete.remove();
        
        renderOrders(mainContainer, activeCounter, completedCounter);
    }
}