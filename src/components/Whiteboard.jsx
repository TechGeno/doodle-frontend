import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import rough from 'roughjs'
import ProgressBar from './Progress';
import UserContext from '../UserContext';
const roughGenerator = rough.generator()

function Whiteboard() {
    const [elements, setelements] = useState([])
    const [elements2, setelements2] = useState([])
    const [color, setColor] = useState("blue-100")
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const {presenter,socket,roomId}=useContext(UserContext)
    const [img,setImg]=useState("")
    useEffect(()=>{
        socket.on("imageres",(data)=>{
            setImg(data.imgUrl)
        })
    },[])
    useEffect(() => {
        if(presenter){
        const canvas = canvasRef.current
        canvas.height = window.innerHeight*0.75
        canvas.width = window.innerWidth*0.75
        const ctx = canvas.getContext("2d")

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctxRef.current = ctx
        }
    }, [])
    useEffect(() => {
        if(presenter){
        ctxRef.current.strokeStyle = color
        }
    }, [color])
    
    useLayoutEffect(() => {
        if(presenter){
        const roughgen = rough.canvas(canvasRef.current);
        if (elements.length > 0) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
        elements.forEach((ele) => {
            if (ele.type === 'pencil')
                roughgen.linearPath(ele.path, { stroke: ele.stroke, strokeWidth: 2, roughness: 0 })
            else if (ele.type === 'line') {
                roughgen.draw(roughGenerator.line(ele.offsetX, ele.offsetY, ele.width, ele.height, { stroke: ele.stroke, strokeWidth: 2, roughness: 0 }))
            }
            else if (ele.type === 'rect') {
                roughgen.draw(roughGenerator.rectangle(ele.offsetX, ele.offsetY, ele.width, ele.height, { stroke: ele.stroke, strokeWidth: 2, roughness: 0 }))
            }
        })
        const canvasimg=canvasRef.current.toDataURL()
        socket.emit("image",{roomId:roomId,img:canvasimg})
    }
    }, [elements])
    const [tool, settool] = useState("Line")

    const [isDrawing, setIsDrawing] = useState(false);
    const undo = () => {
        if(elements.length){
        setelements2((prev) => [...prev, elements[elements.length - 1]])
        setelements((prev) => prev.slice(0, prev.length - 1))
        }
    }
    const redo = () => {
        if(elements2.length){
        setelements((prev) => [...prev, elements2[elements2.length - 1]])
        setelements2((prev) => prev.slice(0, prev.length - 1))
        }
    }
    const handleclear = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        ctx.fillRect = "white"
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        setelements([]);
        setelements2([])
    }
    const handledown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        if (tool === 'Pencil') {
            setelements((Prev) => [...Prev, {
                type: "pencil",
                offsetX,
                offsetY,
                path: [[offsetX, offsetY]],
                stroke: color
            }])
        }
        else if (tool === 'Line') {
            setelements((Prev) => [...Prev, {
                type: "line",
                offsetX,
                offsetY,
                width: offsetX,
                height: offsetY,
                stroke: color
            }])
        }
        else if (tool === 'rect') {
            setelements((Prev) => [...Prev, {
                type: "rect",
                offsetX,
                offsetY,
                width: offsetX,
                height: offsetY,
                stroke: color
            }])
        }
        setIsDrawing(true)
    }
    const handlemove = (e) => {
        if (isDrawing) {
            const { offsetX, offsetY } = e.nativeEvent;


            setelements((prev) => prev.map((ele, index) => {
                if (index === elements.length - 1) {
                    if (ele.type === 'pencil') {
                        const { path } = elements[elements.length - 1];
                        const newp = [...path, [offsetX, offsetY]]
                        return {
                            ...ele, path: newp
                        }
                    }
                    else if (ele.type === 'line') {
                        return { ...ele, width: offsetX, height: offsetY }
                    }
                    else if (ele.type === 'rect') {
                        return { ...ele, width: offsetX - ele.offsetX, height: offsetY - ele.offsetY }
                    }
                } else {
                    return ele
                }
            }))
        }
    }
    const handleup = (e) => {
        setIsDrawing(false)
    }

    const uniqueColors1 = [
        'lime-400', 'green-300', 'emerald-400', 'teal-400', 'cyan-300', 'blue-400', 'indigo-500', 'purple-400', 'pink-400', 'yellow-300', 'amber-300', 'orange-400', 'red-500',
    ];
    const uniqueColors2 = [
        'lime-700', 'green-700', 'emerald-800', 'teal-700', 'cyan-700', 'blue-700', 'indigo-800', 'purple-700', 'pink-700', 'yellow-700', 'amber-700', 'orange-700', 'red-700',
    ];

    return (
        <div className='w-full h-1/3 md:w-1/2 mt-1 mx-1 md:h-full bg-[#ffffff]'>
            
            {presenter? (<div onMouseDown={handledown} onMouseMove={handlemove} onMouseUp={handleup} className="w-full h-full overflow-hidden" >
                <canvas id='cnv' ref={canvasRef}></canvas>
            </div>):(<div className="w-full h-full overflow-hidden" >
                <img  className='h-full w-full' src={img} alt="real time"/> 
            </div>)}
            

            <div className={ presenter?"flex flex-wrap w-full":"invisible"}>
                <div className='flex-col'>
                    <div className='mt-1 flex'>
                        {[...Array(13)].map((_, index) => (
                            <div key={index} className={`h-5 w-5 mr-0.5 bg-${uniqueColors1[index % uniqueColors1.length]}`}></div>
                        ))}
                    </div>

                    <div className='mt-0.5 flex'>
                        {[...Array(13)].map((_, index) => (
                            <div key={index} className={`h-5 w-5 mr-0.5 bg-${uniqueColors2[index % uniqueColors2.length]}`}></div>
                        ))}
                    </div>
                </div>

                <div className='mt-3 ml-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"  onClick={()=>settool("Pencil")}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </div>

                <div className='mt-3 ml-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                    </svg>
                </div>

                <div className='mt-3 ml-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={undo}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </div>

                <div className='mt-3 ml-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"  onClick={redo}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                    </svg>
                </div>

                <div className='mt-3 ml-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"  onClick={handleclear}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
                <input value="blue" type="color"/>
            </div>
        </div>
    );
}

export default Whiteboard;
