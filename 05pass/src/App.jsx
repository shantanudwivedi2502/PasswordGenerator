import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const[length,setLength]=useState(8);
  const[numberAllowed,setNumber]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setPassword]=useState("")
  const passwordRef=useRef(null)
  const copyToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
    window.Navigator.clipboard.writeText(password);
  },[password])

  const passwordGenerator=useCallback(()=>{

   let pass=""
   let str="ABCDFGHIJKLMNOPQRSTUVWXYZabcdeghijklmnopqrstuvwxyz"
   if(numberAllowed) str+="0123456789"
   if(charAllowed)str+="!@#$%^&*(){}:;~`+-_"

   for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
   }
   setPassword(pass)
  },[length,charAllowed,numberAllowed,setPassword])
  useEffect(()=>{
    passwordGenerator()
  },[numberAllowed,charAllowed,passwordGenerator,length])



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center py-2'>Password Generator</h1>
        <div className='flex iteams-center space-x-2'>
          <input
        
            type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={copyToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'> 
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
            </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumber((prev)=>!prev);

            }} />
             <label htmlFor="numberInput">Numbers</label>
            <input type="checkbox" id="characterInput"
            defaultChecked={charAllowed}
            onChange={()=>{
              setCharAllowed((prev)=>!prev )
            }} />
            <label htmlFor="characterInput">Character</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
