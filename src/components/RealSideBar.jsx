import PropTypes from 'prop-types';

import SideBar from './SideBar';
import SideBarIdle from './SideBarIdle';

const RealSideBar = ({ isExpanded }) => {
  return (
    <div>
			{isExpanded ? <SideBar /> : <SideBarIdle />}
    </div>

  );
};


RealSideBar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
};

export default RealSideBar;
