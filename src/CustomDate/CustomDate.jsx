import React, { useState } from 'react'
import moment from 'moment'

export const CustomDate = () => {
    const now = moment()
    const date = now.get()
    const months = date._locale._months
    const [value, setValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(now.month())
    const [currentYear, setCurrentYear] = useState(now.year())
    const daysInMonth = moment(`${currentYear}-${currentMonth + 1 }`, "YY-MM").daysInMonth()
    const listOfDays = Array.from({length: daysInMonth}, (v, k) => k + 1) 

    const isLastOrFirst = (month, position) => {
        if(position === "inc"){
            if (month === 11){
                setCurrentMonth(0)
                setCurrentYear(prev => prev + 1)
            }
            else{
                setCurrentMonth(prev => prev + 1)
            }
        }

        else{
            if(month === 0){
                setCurrentMonth(11)
                setCurrentYear(prev => prev - 1)
            }
            else{
                setCurrentMonth(prev => prev - 1)
            }
        }
    }


    return (
        <div className='' onClick = {() => setIsOpen(!isOpen)} role = "presentation">
            <input type = "text" onChange = {(e) => setValue(e.target.value)} value = {value} placeholder = "Date / Time"/>
            {
                isOpen && (
                    <div className='flex flex-col w-[200px] bg-gray-400' role = "presentation" onClick = {(e) => e.stopPropagation()}>
                        <div className='flex justify-between items-center'>
                            <button onClick = {() => isLastOrFirst(currentMonth, "dec")}>&#8592;</button>
                            <span>{months[currentMonth]}</span>
                            <button onClick = {() => isLastOrFirst(currentMonth, "inc")}>&#8594;</button>
                        </div>
                        <div className='flex flex-wrap gap-[5px]'>
                            {
                                listOfDays.map(item => 
                                    <div className='w-[20px] h-[20px] p-[2px] flex items-center cursor-pointer justify-center hover:bg-gray-100' onClick = {() => setValue(`${currentYear} - ${currentMonth} - ${item}`)} role = "presentation">
                                        {item}
                                    </div>    
                                )
                            }
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}
