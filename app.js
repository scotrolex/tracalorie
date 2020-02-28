// Storage Controller

// Item Controller
const ItemController = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: [
      // { id: 0, name: 'Steak Dinner', calories: 1200 },
      // { id: 1, name: 'Cookie', calories: 200 },
      // { id: 2, name: 'Eggs', calories: 700 },
      // { id: 3, name: 'Fish', calories: 900 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: () => data.items,
    addItem: (name, calories) => {
      let id;
      // Create id
      if (data.items.length > 0) {
        id = data.items.length;
      } else {
        id = 0;
      }
      // Calories to number
      calories = parseInt(calories);

      // Create and return new item
      newItem = new Item(id, name, calories);
      data.items.push(newItem);
      return newItem;
    },
    logData: () => data
  };
})();

// UI Controller
const UIController = (function() {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  };

  // Public method
  return {
    populateItemList: items => {
      let html = '';
      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}"> 
            </strong>${item.name}: <strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>`;
      });
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: item => {
      // Shoe the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add id
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `
        </strong>${item.name}: <strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;
      // Inert item
      // document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      document.querySelector(UISelectors.itemList).appendChild(li);
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    getSelectors: () => UISelectors
  };
})();

// App Controller
const App = (function(ItemController, UIController) {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI Selectors
    const UISelectors = UIController.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = event => {
    // Get form input from UI Controller
    const input = UIController.getItemInput();
    // Check for input UI calorie input
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemController.addItem(input.name, input.calories);
      // Add item to UI list
      UIController.addListItem(newItem);
      // Clear fields
      UIController.clearInput();
    }
    event.preventDefault();
  };

  // Public method
  return {
    init: () => {
      // Fetch Items from data structure
      const items = ItemController.getItems();

      // Check if there is any item in the items list
      if (items.length === 0) {
        UIController.hideList();
      } else {
        // Populate list with items
        UIController.populateItemList(items);
      }

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemController, UIController);

// Initialize App
App.init();
