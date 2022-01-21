import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes,filteredHeroesSelector} from "../heroesList/heroesSlice";
import { heroesDelete } from "../heroesList/heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../spinner/Spinner";
import "./HeroesList.scss";

const HeroesList = () => {


  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useDispatch();
  const { request } = useHttp();
  const filteredHeroes = useSelector(filteredHeroesSelector);
  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE").then(
      dispatch(heroesDelete(id))
    );
  };

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      <CSSTransition timeout={0} classNames="my-node">
        return <h5 className="text-center mt-5">Героев пока нет</h5>
      </CSSTransition>;
    }
    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="my-node">
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return (
    <ul>
      <TransitionGroup component="ul">{elements}</TransitionGroup>
    </ul>
  );
};
export default HeroesList;
