import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";
import api from "../../services/api";
import flagBrasil from "../../assets/flag-brazil.png";
import flagUsa from "../../assets/flag-united-states.png";
import flagSpain from "../../assets/flag-spain.png";
import flagTurkey from "../../assets/flag-turkey.png";

const useStyles = makeStyles({
  flagIcon: {
    width: "20px",
    height: "20px",
  },
  smallButton: {
    width: "24px",
    minHeight: "24px",
    lineHeight: 1,
    marginRight: 15,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const UserLanguageSelector = () => {
  const classes = useStyles();
  const [langueMenuAnchorEl, setLangueMenuAnchorEl] = useState(null);
  const [selectedFlag, setSelectedFlag] = useState(flagBrasil);
  const { user, socket } = useContext(AuthContext);

  const handleOpenLanguageMenu = (e) => {
    setLangueMenuAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    const i18nlocale = localStorage.getItem("i18nextLng");

    if (i18nlocale === "pt-BR") {
      setSelectedFlag(flagBrasil);
    } else if (i18nlocale === "en") {
      setSelectedFlag(flagUsa);
    } else if (i18nlocale === "es") {
      setSelectedFlag(flagSpain);
    } else if (i18nlocale === "tr") {
      setSelectedFlag(flagTurkey);
    } else {
      setSelectedFlag(flagBrasil);
    }
  }, []);

  const handleCloseLanguageMenu = () => {
    setLangueMenuAnchorEl(null);
  };

  const handleChangeLanguage = async (language, flag) => {
    try {
      await i18n.changeLanguage(language);
      await api.put(`/users/${user.id}`, { language });
      setSelectedFlag(flag);
    } catch (err) {
      toastError(err);
    }

    handleCloseLanguageMenu();
  };

  return (
    <>
      <Tooltip title={i18n.t("appBarListem.language")}>
        <IconButton
          size="small"
          color="inherit"
          onClick={handleOpenLanguageMenu}
          className={classes.smallButton}
        >
          <img
            src={selectedFlag}
            alt="Selected flag"
            className={classes.flagIcon}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={langueMenuAnchorEl}
        keepMounted
        open={Boolean(langueMenuAnchorEl)}
        onClose={handleCloseLanguageMenu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom", // Âncora na parte inferior do botão
          horizontal: "center", // Centralizado horizontalmente no botão
        }}
        transformOrigin={{
          vertical: "top", // O menu se expande de cima para baixo
          horizontal: "center", // Alinhado horizontalmente ao centro do botão
        }}
      >
        <MenuItem
          onClick={() => handleChangeLanguage("pt-BR", flagBrasil)}
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          <img src={flagBrasil} alt="Brasil" className={classes.flagIcon} />{" "}
          <span>{i18n.t("languages.pt-BR")}</span>
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeLanguage("en", flagUsa)}
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          <img src={flagUsa} alt="USA" className={classes.flagIcon} />{" "}
          <span>{i18n.t("languages.en")}</span>
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeLanguage("es", flagSpain)}
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          <img src={flagSpain} alt="Spain" className={classes.flagIcon} />{" "}
          <span>{i18n.t("languages.es")}</span>
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeLanguage("tr", flagTurkey)}
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          <img src={flagTurkey} alt="Turkey" className={classes.flagIcon} />{" "}
          <span>{i18n.t("languages.tr")}</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserLanguageSelector;
