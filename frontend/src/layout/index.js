import clsx from "clsx";
import React, { useContext, useEffect, useMemo, useState } from "react";
// import moment from "moment";

// import { isNill } from "lodash";
// import SoftPhone from "react-softphone";
// import { WebSocketInterface } from "jssip";

import {
  AppBar,
  Avatar,
  // FormControl,
  Badge,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import whatsappIcon from "../assets/nopicture.png";

import BackdropLoading from "../components/BackdropLoading";
import NotificationsPopOver from "../components/NotificationsPopOver";
import UserModal from "../components/UserModal";
import { AuthContext } from "../context/Auth/AuthContext";
import MainListItems from "./MainListItems";
// import DarkMode from "../components/DarkMode";
import { MoonStar, Sun } from "lucide-react";
import AnnouncementsPopover from "../components/AnnouncementsPopover";
import UserLanguageSelector from "../components/UserLanguageSelector";
import { getBackendUrl } from "../config";
import toastError from "../errors/toastError";
import { useDate } from "../hooks/useDate";
import useSettings from "../hooks/useSettings";
import ChatPopover from "../pages/Chat/ChatPopover";
import { i18n } from "../translate/i18n";
import ColorModeContext from "./themeContext";

import { ChevronRight } from "@material-ui/icons";
// import { SocketContext } from "../context/Socket/SocketContext";
import AppListItems from "./AppListItems";
import NotificationsVolume from '../components/NotificationsVolume';
const backendUrl = getBackendUrl();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    [theme.breakpoints.down("md")]: {
      height: "calc(100vh - 56px)",
    },
    backgroundColor: theme.palette.fancyBackground,
    "& .MuiButton-outlinedPrimary": {
      color: theme.palette.primary,
      border:
        theme.mode === "light"
          ? "1px solid rgba(0 124 102)"
          : "1px solid rgba(255, 255, 255, 0.5)",
    },
    "& .MuiTab-textColorPrimary.Mui-selected": {
      color: theme.palette.primary,
    },
  },
  chip: {
    background: "red",
    color: "white",
  },
  avatar: {
    width: "100%",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    color: theme.palette.dark.main,
    background: theme.palette.barraSuperior,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#FFF",
    backgroundSize: "cover",
    padding: "0 8px",
    minHeight: "48px",
    [theme.breakpoints.down("sm")]: {
      height: "48px",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
  },
  // menuButton: {
  //   marginRight: 36,
  // },
  menuButtonHidden: {
    display: "none",
  },
  containerMenuButton: {
    width: "100%",
    height: "37px",
    backgroundColor: "#FAFAFA",
    position: "fixed",
    zIndex: 99,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menuButton: {
    color: "black",
    display: "block",
    marginLeft: 5,
  },
  title: {
    flexGrow: 1,
    fontSize: 14,
    color: "white",
    marginLeft: 10,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    // overflowX: "hidden",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    overflowY: "hidden",
  },

  drawerPaperClose: {
    overflowX: "hidden",
    overflowY: "hidden",
    height: "100dvh",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: "72px",
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },

  appBarSpacer: {
    minHeight: "48px",
  },
  appBarSpacerVertical: {
    minHeight: 0,
  },
  content: {
    flex: 1,
    overflow: "auto",
    height: "100dvh",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  // paper: {
  //     padding: theme.spacing(2),
  //     display: "flex",
  //     overflow: "auto",
  //     flexDirection: "column",
  //   },
  containerWithScroll: {
    flex: 1,
    // padding: theme.spacing(1),
    overflowY: "scroll", // Use "auto" para mostrar a barra de rolagem apenas quando necessário
    overflowX: "hidden", // Oculta a barra de rolagem horizontal
    ...theme.scrollbarStyles,
    borderRadius: "8px",
    border: "2px solid transparent",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  },
  NotificationsPopOver: {
    // color: theme.barraSuperior.secondary.main,
  },
  logo: {
    width: "100%",
    height: "45px",
    maxWidth: 180,
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      height: "100%",
      maxWidth: 180,
    },
    logo: theme.logo,
    content:
      "url(" +
      (theme.mode === "light"
        ? theme.calculatedLogoLight()
        : theme.calculatedLogoDark()) +
      ")",
  },
  hideLogo: {
    display: "none",
  },
  avatar2: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    borderRadius: "50%",
    marginRight: 15,
    // border: "2px solid #ccc",
  },
  updateDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  hideSideBar: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  hideTopBar: {
    display: "none",
  },
}));

const StyledBadge = withStyles((theme) => ({
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const LoggedInLayout = ({ children, themeToggle }) => {
  const classes = useStyles();
  const [userToken, setUserToken] = useState("disabled");
  const [loadingUserToken, setLoadingUserToken] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, socket, handleLogout, loading, isHorizontal, setIsHorizontal } =
    useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerVariant, setDrawerVariant] = useState("permanent");
  // const [dueDate, setDueDate] = useState("");
  //   const socketManager = useContext(SocketContext);

  const [activeButton, setActiveButton] = useState(null);
  const theme = useTheme();
  const { colorMode } = useContext(ColorModeContext);
  const greaterThenSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 1);

  const { dateToClient } = useDate();
  const [profileUrl, setProfileUrl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mainListItems = useMemo(
    () => <MainListItems drawerOpen={drawerOpen} collapsed={!drawerOpen} />,
    [user, drawerOpen]
  );

  const settings = useSettings();

  useEffect(() => {
    const getSetting = async () => {
      const response = await settings.get("wtV");

      if (response) {
        setUserToken("disabled");
      } else {
        setUserToken("disabled");
      }
    };

    getSetting();
  });

  useEffect(() => {
    // if (localStorage.getItem("public-token") === null) {
    //   handleLogout()
    // }

    if (document.body.offsetWidth > 600) {
      if (user.defaultMenu === "closed") {
        setDrawerOpen(false);
      } else {
        setDrawerOpen(true);
      }
    }
    if (user.defaultTheme === "dark" && theme.mode === "light") {
      colorMode.toggleColorMode();
    }
  }, [user.defaultMenu, document.body.offsetWidth]);

  useEffect(() => {
    const horizontal = localStorage.getItem("horizontal");

    if (horizontal === "Sim" || !horizontal) {
      setIsHorizontal(true);
      localStorage.setItem("horizontal", "Sim");
    } else {
      setIsHorizontal(false);
    }
  }, []);

  useEffect(() => {
    if (document.body.offsetWidth < 600) {
      setDrawerVariant("temporary");
    } else {
      setDrawerVariant("permanent");
    }
  }, [drawerOpen]);

  useEffect(() => {
    const companyId = user.companyId;
    const userId = user.id;
    if (companyId) {
      //    const socket = socketManager.GetSocket();

      const ImageUrl = user.profileImage;
      if (ImageUrl !== undefined && ImageUrl !== null)
        setProfileUrl(
          `${backendUrl}/public/company${companyId}/user/${ImageUrl}`
        );
      else setProfileUrl(`${process.env.FRONTEND_URL}/nopicture.png`);

      const onCompanyAuthLayout = (data) => {
        if (data.user.id === +userId) {
          toastError("Sua conta foi acessada em outro computador.");
          setTimeout(() => {
            localStorage.clear();
            window.location.reload();
          }, 1000);
        }
      };

      socket.on(`company-${companyId}-auth`, onCompanyAuthLayout);

      socket.emit("userStatus");
      const interval = setInterval(() => {
        socket.emit("userStatus");
      }, 1000 * 60 * 5);

      return () => {
        socket.off(`company-${companyId}-auth`, onCompanyAuthLayout);
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleOpenUserModal = () => {
    setUserModalOpen(true);
    handleCloseMenu();
  };

  const handleClickLogout = () => {
    handleCloseMenu();
    handleLogout();
  };

  const drawerClose = () => {
    if (document.body.offsetWidth < 600 || user.defaultMenu === "closed") {
      setDrawerOpen(false);
    }
  };

  const handleRefreshPage = () => {
    window.location.reload(false);
  };

  if (loading) {
    return <BackdropLoading />;
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveButton(null);
  };

  const toggleDrawer = (open) => (event) => {
    // Verifica se o clique é fora do drawer (não é um clique no próprio drawer ou nas teclas ESC/Enter)
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant={drawerVariant}
        // className={drawerOpen ? classes.drawerPaper : classes.drawerPaperClose}
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose,
            isHorizontal && greaterThenSm && classes.hideSideBar
          ),
        }}
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}
      >
        <div className={classes.toolbarIcon}>
          <img
            className={drawerOpen ? classes.logo : classes.hideLogo}
            alt="logo"
          />
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
            {!drawerOpen ? <ChevronRight /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List className={classes.containerWithScroll}>
          {/* {mainListItems} esse não */}
          <MainListItems
            collapsed={!drawerOpen}
            isHorizontal={(value) => setIsHorizontal(value)}
          />
        </List>
        <Divider />
      </Drawer>
      <div className={classes.containerMenuButton}>
        <IconButton
          edge="start"
          variant="contained"
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label="open drawer"
          className={clsx(
            classes.menuButton,
            !isHorizontal && drawerOpen && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <AppBar
        position="absolute"
        className={clsx(
          classes.appBar,
          // drawerOpen && classes.appBarShift,
          !isHorizontal && greaterThenSm && classes.hideTopBar
        )}
        color="primary"
      >
        <Toolbar variant="dense" className={classes.toolbar}>
          {/* <IconButton
            edge="start"
            variant="contained"
            aria-label="open drawer"
            style={{ color: "white" }}
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={clsx(drawerOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton> */}
          <img className={classes.logo} alt="logo" />
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {/* {greaterThenSm && user?.profile === "admin" && getDateAndDifDays(user?.company?.dueDate).difData < 7 ? ( */}
            {/* {greaterThenSm &&
            user?.profile === "admin" &&
            user?.company?.dueDate ? (
              <>
                {i18n.t("mainDrawer.appBar.user.message")} <b>{user.name}</b>,{" "}
                {i18n.t("mainDrawer.appBar.user.messageEnd")}{" "}
                <b>{user?.company?.name}</b>! (
                {i18n.t("mainDrawer.appBar.user.active")}{" "}
                {dateToClient(user?.company?.dueDate)})
              </>
            ) : (
              <>
                {i18n.t("mainDrawer.appBar.user.message")} <b>{user.name}</b>,{" "}
                {i18n.t("mainDrawer.appBar.user.messageEnd")}{" "}
                <b>{user?.company?.name}</b>!
              </>
            )} */}
          </Typography>

          {/*  */}
          {/*Menu Atendimento  */}
          <AppListItems />

          {userToken === "enabled" && user?.companyId === 1 && (
            <Chip
              className={classes.chip}
              label={i18n.t("mainDrawer.appBar.user.token")}
            />
          )}

          {/* DESABILITADO POIS TEM BUGS */}

          {/* <SoftPhone
            callVolume={33} //Set Default callVolume
            ringVolume={44} //Set Default ringVolume
            connectOnStart={false} //Auto connect to sip
            notifications={false} //Show Browser Notification of an incoming call
            config={config} //Voip config
            setConnectOnStartToLocalStorage={setConnectOnStartToLocalStorage} // Callback function
            setNotifications={setNotifications} // Callback function
            setCallVolume={setCallVolume} // Callback function
            setRingVolume={setRingVolume} // Callback function
            timelocale={'UTC-3'} //Set time local for call history
          /> */}
          {user.id && <NotificationsPopOver volume={volume} />}

          <AnnouncementsPopover />

          <ChatPopover />
          <NotificationsVolume setVolume={setVolume} volume={volume} />
          <IconButton
            edge="start"
            size="small"
            onClick={colorMode.toggleColorMode}
          >
            {theme.mode === "dark" ? (
              <Tooltip title={i18n.t("appBarListem.light")}>
                <MoonStar
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                    marginRight: 15,
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title={i18n.t("appBarListem.dark")}>
                <Sun
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                    marginRight: 15,
                  }}
                />
              </Tooltip>
            )}
          </IconButton>


          {/* <IconButton
            onClick={handleRefreshPage}
            aria-label={i18n.t("mainDrawer.appBar.refresh")}
            color="inherit"
          >
            <CachedIcon style={{ color: "white" }} />
          </IconButton> */}

          {/* <DarkMode themeToggle={themeToggle} /> */}

          <UserLanguageSelector />
          <div>
            <Tooltip title={i18n.t("appBarListem.profile")}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
                onClick={handleMenu}
              >
                <Avatar
                  alt="Multi100"
                  className={classes.avatar2}
                  src={profileUrl}
                />
              </StyledBadge>
            </Tooltip>
            <UserModal
              open={userModalOpen}
              onClose={() => setUserModalOpen(false)}
              onImageUpdate={(newProfileUrl) => setProfileUrl(newProfileUrl)}
              userId={user?.id}
            />

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={menuOpen}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleOpenUserModal}>
                {i18n.t("mainDrawer.appBar.user.profile")}
              </MenuItem>
              <MenuItem onClick={handleClickLogout}>
                {i18n.t("mainDrawer.appBar.user.logout")}
              </MenuItem>
            </Menu>
          </div>
          <Tooltip title={i18n.t("appBarListem.vertical")}>
            <IconButton
              size="small"
              onClick={() => {
                setIsHorizontal(false);
                localStorage.setItem("horizontal", "Não");
              }}
            >
              <MenuIcon
                style={{ color: "white", width: "20px", height: "20px" }}
              />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div
          className={
            isHorizontal ? classes.appBarSpacer : classes.appBarSpacerVertical
          }
        />

        {children ? children : null}
      </main>
    </div>
  );
};

export default LoggedInLayout;
