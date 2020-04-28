class Book{
	constructor(title,author,isbn ){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}

}

class UI{
	addBookToList(book){
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

	showAlert(msg, className){
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

	deleteBook(target){
		if(target.className === 'delete'){
			target.parentElement.parentElement.remove();
		}
	}

	clearFields(){
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';

	}
}

//Local Storage class
class Store{
	static getBooks(){
		let books;
		if(localStorage.getItem('books') === null){
			books = [];
		}
		else{
			books = JSON.parse(localStorage.getItem('books'));
			console.log(books);
		}

		return books;

	}
	//Display books from storage

	static displayBooks(book){
	const books = Store.getBooks();

	books.forEach(function(book){
		const ui = new UI();
		ui.addBookToList(book);
	})		

	}
	static addBooks(book){
		const books = Store.getBooks();
		books.push(book);

		localStorage.setItem('books',JSON.stringify(books));
	}
	static removeBook(isbn){
		const books = Store.getBooks();
		
		books.forEach(function(book, index){
			if(book.isbn ===isbn){
				//Deleting element from an array
				books.splice(index, 1)
			}
		});

		localStorage.setItem('books',JSON.stringify(books));

	}
}

//Dom Load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks)



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

		//Add to store

		Store.addBooks(book)

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


	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	e.preventDefault();
	console.log(e);
})
