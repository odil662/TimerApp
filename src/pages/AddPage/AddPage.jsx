import './AddPage.css'
import Header from '../../components/Header/Header'
import NumbersList from '../../components/NumbersList'
import { useState } from 'react'
import { TimerContext } from '../../contexts/TimerContext'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function AddPage() {

    const navigate = useNavigate()

    const { timers, setTimers } = useContext(TimerContext)

    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const addTimer = () => {

        if (minutes === 0 && seconds === 0) {
            return 
        }

        const endTime = Date.now() + (minutes * 60 + seconds) * 1000

        const timer = {
            id: Date.now(),
            startTime: Date.now(),
            endTime,
            lastTime: 0,
            timeLeft: 0,
            isStarted: false
        }

        setTimers([...timers, timer])
        console.log(timers)
        navigate('/')
    }

    

    return (
        <>
        <div className='shadow'></div>
        <div className='add-page__wrapper'>
            <Header>
                <Link className='add-page__link' to='/'>Отменить</Link>
            </Header>
            <div className='add-page__timer'>
                <div className='add-page__container'>
                    <NumbersList setTime={setMinutes}/>
                    <p className='add-page__timetext'>Мин</p>
                </div>
                <div className='add-page__container'>
                    <NumbersList setTime={setSeconds}/>
                    <p className='add-page__timetext'>Сек</p>
                </div>
            </div>
            <div className='add-page__button'>
                <button onClick={addTimer} className='add-page__start'>Старт</button>
            </div>
        </div>
        </>
    )
}

export default AddPage 