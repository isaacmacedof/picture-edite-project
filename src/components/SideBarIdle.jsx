import allArts from '../images/all-arts.png'
import allImages from '../images/all-images.png'
import allStorys from '../images/Store.png'
import allFilters from '../images/Filters.png'
import allSugestions from  '../images/sugestions.png'
import allConfigurations from '../images/configuration-icon.png'
import '../styles/components/SideBarIdle.css';

const SideBarIdle = () => {
  return (
    <div className="sidebaridle">
      <div className='image-sideBarIdle'>
        <button>
          <img src={ allArts } alt="" />
        </button>
      </div>
      <div className='image-sideBarIdle'>
        <button>
          <img src={ allImages } alt="" />
        </button>
      </div>
      <div className='image-sideBarIdle'>
        <button>
          <img className='story' src={ allStorys } alt="" />
        </button>
      </div>
      <div className='image-sideBarIdle'>
        <button>
          <img src={ allFilters } alt="" />
        </button>
      </div>
      <div className='image-sideBarIdle'>
        <button>
          <img src={ allSugestions } alt="" />
        </button>
      </div>
      <div className='image-sideBarIdle'>
        <button>
          <img src={ allConfigurations } alt="" />
        </button>
      </div>
    </div>
  );
};

export default SideBarIdle;