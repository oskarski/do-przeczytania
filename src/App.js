
// const obj = {
//   foo: 1,
//   bar: 2,
// };


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


function App() {
  return (
    <div className="p-4">
      
      <form 
        onSubmit={e => {
          e.preventDefault();
          
          const formData = new FormData(e.target);

          const title = formData.get('title');
          const author = formData.get('author');

          console.log({ title, author });

          e.target.reset();
        }}
        className="bg-gray-200 border-gray-500 border p-5 rounded flex gap-x-4 items-end"
       >
        <div className="flex-1 flex gap-x-4">
          <div className="flex-1">
            <Label htmlFor="title" className="block mb-2">Tytuł książki</Label>
            {/* Label({ htmlFor: 'title', className: 'block mb-2', children: 'Tytuł ...' }) */}
            <Input id="title" name="title" type="text" />
          </div>

          <div className="flex-1">
            <Label htmlFor="author" className="block mb-2">Autor książki</Label>
            <Input id="author" name="author" type="text" />
          </div>
        </div>

        <button className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-700 transition">Dodaj książkę</button>
      </form>

    </div>
  );
}

export default App;
