import { useState, useEffect, useContext } from 'react';
import { Bell, Globe, Plus, UserPlus } from 'react-feather';
import { BiBuildings, BiWallet } from 'react-icons/bi';
import { BsFillCalendarWeekFill, BsFillChatDotsFill, BsListCheck } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { GiRank2, GiStairsGoal, GiTakeMyMoney } from 'react-icons/gi';
import {
  MdCardMembership,
  MdContactPhone,
  MdOutlineNotifications,
  MdSecurity
} from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';
import { SiTask } from 'react-icons/si';
import { TiContacts } from 'react-icons/ti';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import TaskList from '../../../../views/taskngoals/tabs/TaskList';
import Goal from '../../../../views/taskngoals/tabs/HabitList';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { AbilityContext } from '../../../../utility/context/Can';
import { useSelector } from 'react-redux';

const MobileFooter = () => {
  const [isSlideUpVisible, setSlideUpVisible] = useState(false);
  const [activeFooterItem, setActiveFooterItem] = useState(0);
  const ability = useContext(AbilityContext);
  const contactTypes = useSelector((state) => state?.totalContacts?.contactTypeList);

  const [active, setActive] = useState('1');
  const [isChatTabActive, setIsChatTabActive] = useState(false);
  const [isTaskTabActive, setIsTaskTabActive] = useState(false);
  const [isGoalTabActive, setIsGoalTabActive] = useState(false);
  const [isMemberShipTabActive, setIsMemberShipTab] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    const chatQueryParam = queryParams.get('chat');
    setIsChatTabActive(chatQueryParam === 'true');
    const isQueryParam = queryParams.get('active')
    setIsMemberShipTab(isQueryParam === 'membership');
  }, [queryParams]);

  const buttonClicked = () => {
    setSlideUpVisible(!isSlideUpVisible);
  };

  const handleIconClick = (item, type, id) => {
    console.log(type);
    setActiveFooterItem(item);

    switch (item) {
      case 0:
        history.push('/organizations');
        break;
      case 1:
        const contact = contactTypes.find((contact) => contact.type === type && contact._id === id);
        if (contact) {
          const { type, _id } = contact;
          history.push(`/contacts/${type}/${_id}`);
        }
        break;
      case 2:
        history.push('/calendar');
        break;
      case 3:
        if (ability.can('read', 'marketing/chat')) {
          setIsChatTabActive(true);
          history.push('/business/tools?chat=true');
        } else {
          alert('You do not have permission to access the chat page.');
        }
        setSlideUpVisible(false);
        break;
      case 4:
        if (ability.can('read', 'tasksAndGoals/tasks')) {
          setIsTaskTabActive(true);
          history.push('/tasksAndGoals?tasks=true');
        } else {
          alert('You do not have permission to access the chat page.');
        }
        setIsTaskTabActive(false);
        break;
      case 5:
        if (ability.can('read', 'tasksAndGoals/goals')) {
          setIsGoalTabActive(true);
          history.push('/tasksAndGoals?goals=true');
        } else {
          alert('You do not have permission to access the chat page.');
        }
        setIsGoalTabActive(false);
        break;
      case 6:
        if (ability.can('read', 'shop/membership')) {
          setIsMemberShipTab(true);
          history.push('/ecommerce/shop?active=membership');
        } else {
          alert('You do not have permission to access the Membership page.');
        }
        setIsMemberShipTab(false);
        break;
      default:
        break;
    }
    setSlideUpVisible(false);
  };

  return (
    <>
      <div className="container__elements">
        <div className="phone__container">
          <div className="round-animations">
            <div
              className={`round__circle ${isSlideUpVisible ? 'slideUp' : 'hideAnimation'}`}
            ></div>
          </div>

          {isSlideUpVisible && (
            <div className={`gooey ${isSlideUpVisible ? 'show' : 'hide'}`}>
              <span className="gooey__piece"></span>
              <span className="gooey__piece"></span>
              <span className="gooey__piece"></span>
              <Nav>
                <NavItem>
                  <NavLink active={isTaskTabActive} onClick={() => handleIconClick(4)}>
                    <span
                      className={`gooey__icon gooey__icon-task task ${
                        isSlideUpVisible ? 'show' : ''
                      }`}
                      active={active === '4'}
                    >
                      <SiTask className=" me-50" size={34} />
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={isGoalTabActive} onClick={() => handleIconClick(5)}>
                    <span
                      className={`gooey__icon gooey__icon-goal goal ${
                        isSlideUpVisible ? 'show' : ''
                      }`}
                      onClick={() => {
                        setActive('5');
                      }}
                    >
                      <GiStairsGoal className=" me-50" size={34} />
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={isMemberShipTabActive} onClick={() => handleIconClick(6)}>
                    <span
                      className={`gooey__icon gooey__icon-membership membership ${
                        isSlideUpVisible ? 'show' : ''
                      }`}
                      active={active === '6'}
                      onClick={() => {
                        setActive('6');
                      }}
                    >
                      <MdCardMembership className=" me-50" size={34} />
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          )}

          <nav className="phone__container-navbar">
            <div className="phone__container-navbar-items">
              <NavItem>
                <NavLink onClick={() => handleIconClick(0)}>
                  <BiBuildings size={24} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => handleIconClick(1, 'client', '6457376531fc9166f8c9bb5a')}>
                  <MdContactPhone size={24} />
                </NavLink>
              </NavItem>
              <div
                className={`plus__container ${isSlideUpVisible ? 'clicked' : ''}`}
                onClick={buttonClicked}
              >
                <div className="hexagon"></div>
                <NavItem>
                  <NavLink>
                    <Plus
                      size={24}
                      className={isSlideUpVisible ? 'plus__button rotate' : 'plus__button'}
                    />
                  </NavLink>
                </NavItem>
              </div>
              <NavItem className={activeFooterItem === 2 ? 'active' : ''}>
                <NavLink onClick={() => handleIconClick(2)}>
                  <BsFillCalendarWeekFill size={24} />
                </NavLink>
              </NavItem>
              <NavItem className={activeFooterItem === 3 ? 'active' : ''}>
                <NavLink
                  active={isChatTabActive}
                  onClick={() => {
                    handleIconClick(3);
                  }}
                >
                  <BsFillChatDotsFill size={24} />
                </NavLink>
              </NavItem>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
