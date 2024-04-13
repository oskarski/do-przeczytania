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


export const Label = (props) => {
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