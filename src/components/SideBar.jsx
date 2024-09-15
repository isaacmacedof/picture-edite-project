import allArtsRed from '../images/todas-as-artes.png'
import allImages from '../images/feed-icon.png'
import allStorys from '../images/Story-icon.png'
import allFilters from '../images/type-arts-icon.png'
import vetorFilter from '../images/vetor-tipos-de-arte.png'
import allSugestions from  '../images/sugestion-icon.png'
import allConfigurations from '../images/configuration-icon-red.png'
import '../styles/components/SideBar.css';

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className='bar-red'></div>
      <div className='element-side-bar'>
        <button className='image-sideBar'>
          <img src={ allArtsRed } alt="" /> <p className='text-side-bar'>Artes</p>
        </button>
      </div>
      <div className='element-side-bar'>
        <button className='image-sideBar'>
          <img src={ allImages } alt="" /> <p className='text-side-bar'>Feed</p>
        </button>
      </div>
      <div className='element-side-bar'>
        <button className='image-sideBar'>
          <img src={ allStorys } alt="" /> <p className='text-side-bar'>Story</p>
        </button>
      </div>
      <div className='element-side-bar special-element'>
        <button className='image-sideBar'>
          <img src={ allFilters } alt="" /> <p className='text-side-bar space-text'>Filtros</p> <img src={ vetorFilter }></img>
        </button>
      </div>
      <div className='element-side-bar'>
        <button className='image-sideBar'>
          <img src={ allSugestions } alt="" /> <p className='text-side-bar'>Sugestões</p>
        </button>
      </div>
      <div className='element-side-bar'>
        <button className='image-sideBar'>
          <img src={ allConfigurations } alt="" /> <p className='text-side-bar'>Configurações</p>
        </button>
      </div>
      <div className='bar-red-down absolute-down'></div>
    </div>
  );
};

export default SideBar;
