import { useRef } from 'react';
import useScrollOnDrag from 'react-scroll-ondrag';
import { sixtyNumbers } from '../utils/constants';

function NumbersList({setTime}) {

    const ref = useRef();
    const { events } = useScrollOnDrag(ref);

    return (
        // <ul {...events} ref={ref} className='add-page__time-counter'>
            <ul className='add-page__list'>
            {sixtyNumbers.map((number) => {
                return <li className='add-page__list-item' onClick={() => setTime(number)} key={number+60}>{number}</li>
            })}
        </ul>
    )
}

export default NumbersList