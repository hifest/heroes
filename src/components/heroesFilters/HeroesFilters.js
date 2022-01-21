
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import {fetchFilters} from '../heroesFilters/filterSlice'
import {FilterActive,selectAll} from '../heroesFilters/filterSlice'
import Spinner from '../spinner/Spinner';
import store from '../../store/index';
const HeroesFilters = () => {
    const {filterActive,filterState} = useSelector(state => state.filters);

    const dispatch = useDispatch();
    const filters = selectAll(store.getState())
    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);
    const renderFilters = (arr) =>{
        if(filterState === 'loading'){
            return <Spinner/>
        }else if(filterState === 'erorr'){
            return <h5 className="text-center mt-5">Ошибка загрузки</h5>
        }
       return  arr.map(({name,label,className})=>{
        const btnClass = classNames('btn', className, {
            'active' : name === filterActive  
        })
            return (
                <button
                key={name}
                className={btnClass}
                onClick={()=>dispatch(FilterActive(name))}
                >
                    {label}
                </button>
            )
        })
    }
    const elements = renderFilters(filters)
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;