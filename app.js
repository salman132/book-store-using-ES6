//Book Constructor

function Book(title,author,isbn){
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}


//UI 

function UI(){

}

UI.prototype.addBookToList = function(book){

	//Book to do list
	const list = document.getElementById('book-list');

	//Creating tr element for table
	const row = document.createElement('tr');

	//Insert cols 
	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
	`;

	//Append
	list.appendChild(row);
}

//Clear fields
UI.prototype.clearFields = function(){
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
}

//Delete Book
UI.prototype.deleteBook = function(target){
	if(target.className === 'delete'){
		target.parentElement.parentElement.remove();
	}
}

//Show alert
UI.prototype.showAlert = function(msg,className){
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(msg));

	//Getting dom
	const container = document.querySelector('.container');

	const form = document.querySelector('#book-form');
	//Insert Alert
	container.insertBefore(div,form);

	setTimeout(function(){
		div.remove();
	},5000)

}


//Event Listener for add

document.getElementById('book-form').addEventListener('submit',function(e){
	

	const title = document.getElementById('title').value,
		  author = document.getElementById('author').value,
		  isbn = document.getElementById('isbn').value;

	//Instantiate Book class 	  

	const book = new Book(title,author,isbn);

	const ui = new UI();

	//Validate
	if(title === '' || author ==='' || isbn ===''){
		ui.showAlert('PLease fill in all fields','error');
	}
	else{
		//Calling book prototype
		ui.addBookToList(book);

		//Clear Fields
		ui.clearFields();

		//Success msg
		ui.showAlert('Book Added','success');
	}



	

	e.preventDefault();
});

//Event Listener for delete
document.getElementById('book-list').addEventListener('click',function(e){

	const ui = new UI();
	ui.deleteBook(e.target);
	e.preventDefault();
	console.log(e);
})
