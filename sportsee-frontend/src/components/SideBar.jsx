import './SideBar.css'
import iconYoga from '../assets/icon_yoga.png'
import iconNage from '../assets/icon_nage.png'
import iconVelo from '../assets/icon_velo.png'
import iconHaltere from '../assets/icon_haltere.png'

function SideBar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <img src={iconYoga} alt="Yoga" />
        </li>
        <li className="sidebar__item">
          <img src={iconNage} alt="Natation" />
        </li>
        <li className="sidebar__item">
          <img src={iconVelo} alt="Vélo" />
        </li>
        <li className="sidebar__item">
          <img src={iconHaltere} alt="Musculation" />
        </li>
      </ul>
      <div className="sidebar__copyright">Copyright, SportSee 2020</div>
    </aside>
  )
}

export default SideBar
