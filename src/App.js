
// const obj = {
//   foo: 1,
//   bar: 2,
// };

import { useState } from "react"


// const { foo } = obj

// const secondObj = { ...obj }

// console.log(foo);

// const Foo = ({foo, bar}) => {
//   return <div></div>
// }

// const Foo = (props) => {
//   const {foo, bar} = props;

//   return <div></div>
// }


const Label = (props) => {
  return <label {...props} className="block mb-2" />

  // Spread operator -> przepisanie propsów do `<label />`
  // return <label 
  //         {...props}
  //         // key=props[key]
  //         // htmlFor={props.htmlFor}
  //         // className={props.className}
  //         // children={props.children} *
  //         className="block mb-2"
  //         />
}

const Input = (props)=> {
  return <input {...props} className="w-full border border-gray-500 rounded py-1 px-2" />
}

const FieldErrorMessage = ({ error }) => {
  if (!error) return null

  return <span className="text-red-700">{error.message}</span>
}

const validateCreateBookData = (data) => {
  if (typeof data !== 'object') throw new Error('Expected object, received ' + typeof data);

  const errors = {};

  if (!data.title) errors['title'] = new Error('Tytuł jest wymagany!');
  if (!data.author) errors['author'] = new Error('Autor jest wymagany!');

  return errors;
}

function App() {
  const [errors, setErrors] = useState({});
  const [books, setBooks] = useState([]);

  return (
    <div className="p-4 flex flex-col gap-y-8">
      
      <form 
        onSubmit={e => {
          e.preventDefault();
          
          const formData = new FormData(e.target);

          const title = formData.get('title');
          const author = formData.get('author');

          const createBookData = { title, author };
          const validationErrors = validateCreateBookData(createBookData);
          const hasErrors = Object.keys(validationErrors).length > 0;

          if (hasErrors) {
            setErrors(validationErrors);
            return
          }

          // setBooks(prev => {
          //   return [...prev, createBookData]
          // });
          setBooks(prev => [...prev, createBookData]);

          setErrors({});
          e.target.reset();
        }}
        className="bg-gray-200 border-gray-500 border p-5 rounded flex gap-x-4 items-end"
       >
        <div className="flex-1 flex gap-x-4">
          <div className="flex-1">
            <Label htmlFor="title" className="block mb-2">Tytuł książki</Label>
            {/* Label({ htmlFor: 'title', className: 'block mb-2', children: 'Tytuł ...' }) */}
            <Input id="title" name="title" type="text" />
            <FieldErrorMessage error={errors.title} />
          </div>

          <div className="flex-1">
            <Label htmlFor="author" className="block mb-2">Autor książki</Label>
            <Input id="author" name="author" type="text" />
            <FieldErrorMessage error={errors.author} />
          </div>
        </div>

        <button className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-700 transition">Dodaj książkę</button>
      </form>

      {books.length > 0 && <ul className="space-y-4">
        {books.map(book =>
          <li key={book.title} className="bg-gray-200 p-6 rounded-lg">
            <h3 className="text-3xl mb-1">{book.title}</h3>
            <span className="text-md italic text-gray-700">{book.author}</span>
          </li>
        )}
      </ul>}

    </div>
  );
}

export default App;
