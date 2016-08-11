// Variable Definitions
var url = "https://galvanize-eats-api.herokuapp.com/menu";
var cart = [];
var total = 0;
var subtotal = 0;
var tax = 0;

// Function Definitions
function displayMenu(data){
  // Displays Menu items and prices on page
  for (var i in data.menu){
    // Pizzas
    if(data.menu[i].type === "pizza"){
    // Display in Table
      $(".pizzaBody").append (
        // Each Table Row must have a class "clickable-row" added to enable the clicking and highlighting functionality
        // Name
        $("<tr>", {"class": "clickable-row"})
        .append (
          $("<td>", {text:data.menu[i].name, val:data.menu[i].name})
        )
        // Price
        .append (
          $("<td>", {text:data.menu[i].price, val:data.menu[i].price})
        )
        // Quantity text input
        .append (
          $("<td>"). append (
            $("<input>", {"type": "text-area", "class": "amount", "id": (data.menu[i].name).replace(" ",""), "val": 1, "min": 1, "max": 99})
          )
        )
        // Add Item Button
        .append (
          $("<a>", {"class":"btn btn-success addItem actionButton", text: "Add to Cart", val: data.menu[i].name} )
        )
      )
    }
    else {
      $(".burgerBody").append (
        // Each Table Row must have a class "clickable-row" added to enable the clicking and highlighting functionality
        // Name
        $("<tr>", {"class": "clickable-row"})
        .append (
          $("<td>", {text:data.menu[i].name, val:data.menu[i].name})
        )
        // Price
        .append (
          $("<td>", {text:data.menu[i].price, val:data.menu[i].price})
        )
        // Quantity text input
        .append (
          $("<td>"). append (
            $("<input>", {"type": "text-area", "class": "amount", "id": (data.menu[i].name).replace(" ",""), "val": 1, "min": 1, "max": 99})
          )
        )
        // Add Item Button
        .append (
          $("<a>", {"class":"btn btn-success addItem actionButton", text: "Add to Cart", val: data.menu[i].name} )
        )
      )
    }
    // Highlight First Menu Item
    $(".clickable-row:first").addClass('success');
  }
}

function addItem(data,name,input){
  for (var i in cart){
    if(name === cart[i].name){
      cart[i].count += Number(input);
      return;
    }
  }
  for (var j in data.menu){
    if(name === data.menu[j].name){
      cart.push({name: data.menu[j].name, price: data.menu[j].price, count: Number(input)})
    }
  }
  displayCart();
}

// Validate Quantity Input
function validate(input,idName,data,name,cart){
  if(input < 1 || input > 99){
    $(idName).val("Please enter a value between 1 and 99");
  }
  else{
    addItem(data,name,input);
    addTotal(cart);
    displayCart(cart,total);
  }
}

function addTotal(cart){
  subtotal = 0;
  tax = 0;
  total = 0;
  for (var i in cart){
    subtotal += Number((cart[i].price * cart[i].count).toFixed(2));
  }
  tax = (subtotal * 0.083).toFixed(2);
  total = (Number(subtotal) + Number(tax)).toFixed(2);
}

function displayCart(cart,total){

  var output = "";
  for (var i in cart){
    output += "<li>"+ cart[i].name + " x " + cart[i].count + " (" + cart[i].price + " each) = " + (cart[i].price * cart[i].count) +"</li>"
  }
  $(".cart").html(output);
  $(".subtotal").text("Subtotal = " + subtotal);
  $(".tax").text("Tax (8.3%) = " + tax);
  $(".total").text("Total = " + total);
}

$(document).ready(function(){

  $.get(url)
  .then(function(data){
    displayMenu(data);
    console.log(data);
    // Add item to order when the plus button is clicked
    $(document).on("click", ".addItem", function(){
      var name = $(this).val();
      var idName = ("#" + name).replace(" ","");
      var input = $(idName).val();
      validate(input,idName,data,name,cart);
    });
  });

  // Highlight Menu items on click
  $('.table').on('click', '.clickable-row', function(event) {
    $(this).addClass('success').siblings().removeClass('success');
  });

});
