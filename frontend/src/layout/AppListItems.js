import React, { useContext, useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { LayoutDashboard } from "lucide-react";

import { AuthContext } from "../context/Auth/AuthContext";
import { i18n } from "../translate/i18n";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowSquare,
  Calendar,
  Flash,
  Kanban,
  MessageFavorite,
  Setting2,
  Tag,
  UserAdd,
  Whatsapp,
} from "iconsax-react";

import { ArrowRight } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import VersionControl from "../components/VersionControl";

export default function AppListItems() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { user, handleLogout, loading } = useContext(AuthContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  const handleSubmenuOpen = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveButton(null);
  };

  const handleMenuClick = (event, buttonIndex) => {
    // Abre o menu correspondente e fecha qualquer outro menu aberto
    setAnchorEl(event.currentTarget);
    setActiveButton(buttonIndex);
  };

  const handleOpenUserModal = () => {
    setUserModalOpen(true);
    handleCloseMenu();
  };

  const handleClickLogout = () => {
    handleCloseMenu();
    handleLogout();
  };
  const handleSubMenuClick = (submenu, buttonIndex) => {
    // Define o submenu correspondente ao botão e limpa todos os outros
    setSelectedSubMenu({ [buttonIndex]: submenu });
    handleMenuClose();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        marginRight: 15,
      }}
    >
      <VersionControl />

      <Tooltip title={i18n.t("appBarListem.ticket")}>
        <IconButton
          component={RouterLink}
          to="/tickets"
          size="small"
          style={{
            borderRadius: selectedSubMenu[2] ? 5 : 80,
            paddingInline: selectedSubMenu[2] ? "5px" : 2,
            fontSize: "12px",
            color: "#FFF",
            fontFamily: "Poppins",
          }}
        >
          <Whatsapp style={{ width: "20px", height: "20px" }} />{" "}
        </IconButton>
      </Tooltip>

      {/* Dashboard */}
      {user.profile === "admin" && (
        <Tooltip title={i18n.t("appBarListem.reports")}>
          <IconButton
            size="small"
            style={{
              borderRadius: selectedSubMenu[2] ? 5 : 80,
              paddingInline: selectedSubMenu[2] ? "5px" : 2,
              fontSize: "14px",
              color: "#FFF",
              fontFamily: "Poppins",
            }}
            onClick={(event) => handleMenuClick(event, 2)}
          >
            <LayoutDashboard style={{ width: "20px", height: "20px" }} />{" "}
            <AnimatePresence>
              {selectedSubMenu[2] && (
                <motion.span
                  key="submenu-1"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginLeft: 4,
                    display: "inline-block",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    fontFamily: "Poppins",
                  }}
                >
                  {selectedSubMenu[2]}
                </motion.span>
              )}
            </AnimatePresence>
          </IconButton>
        </Tooltip>
      )}

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={activeButton === 2}
        onClose={handleMenuClose}
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
          onClick={() => handleSubMenuClick("Dashboard", 2)}
          component={RouterLink}
          to="/"
        >
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => handleSubMenuClick("Relatórios", 2)}
          component={RouterLink}
          to="/reports"
        >
          Relatórios
        </MenuItem>
        <MenuItem
          onClick={() => handleSubMenuClick("Painel de atendimento", 2)}
          component={RouterLink}
          to="/moments"
        >
          Painel
        </MenuItem>
      </Menu>
      {/* QuickResponse */}
      <Tooltip title={i18n.t("appBarListem.quickResponse")}>
        <IconButton
          component={RouterLink}
          to="/quick-messages"
          size="small"
          style={{
            borderRadius: selectedSubMenu[2] ? 5 : 80,
            paddingInline: selectedSubMenu[2] ? "5px" : 2,
            fontSize: "12px",
            color: "#FFF",
            fontFamily: "Poppins",
          }}
        >
          <Flash style={{ width: "20px", height: "20px" }} />{" "}
        </IconButton>
      </Tooltip>
      {/* Kanbabn */}
      <Tooltip title={i18n.t("appBarListem.kanban")}>
        <IconButton
          component={RouterLink}
          to="/kanban"
          size="small"
          style={{
            borderRadius: selectedSubMenu[2] ? 5 : 80,
            paddingInline: selectedSubMenu[2] ? "5px" : 2,
            fontSize: "12px",
            color: "#FFF",
            fontFamily: "Poppins",
          }}
        >
          <Kanban style={{ width: "20px", height: "20px" }} />{" "}
        </IconButton>
      </Tooltip>
      <Tooltip title={i18n.t("appBarListem.contacts")}>
        <IconButton
          component={RouterLink}
          to="/contacts"
          size="small"
          style={{
            borderRadius: selectedSubMenu[2] ? 5 : 80,
            paddingInline: selectedSubMenu[2] ? "5px" : 2,
            fontSize: "12px",
            color: "#FFF",
            fontFamily: "Poppins",
          }}
        >
          <UserAdd style={{ width: "20px", height: "20px" }} />{" "}
        </IconButton>
      </Tooltip>
      <Tooltip title={i18n.t("appBarListem.schedule")}>
        <IconButton
          component={RouterLink}
          to="/schedules"
          size="small"
          style={{
            borderRadius: selectedSubMenu[2] ? 5 : 80,
            paddingInline: selectedSubMenu[2] ? "5px" : 2,
            fontSize: "12px",
            color: "#FFF",
            fontFamily: "Poppins",
          }}
        >
          <Calendar style={{ width: "20px", height: "20px" }} />{" "}
        </IconButton>
      </Tooltip>
      <Tooltip title={i18n.t("appBarListem.tags")}>
        <IconButton
          component={RouterLink}
          to="/tags"
          size="small"
          style={{
            borderRadius: selectedSubMenu[2] ? 5 : 80,
            paddingInline: selectedSubMenu[2] ? "5px" : 2,
            fontSize: "12px",
            color: "#FFF",
            fontFamily: "Poppins",
          }}
        >
          <Tag style={{ width: "20px", height: "20px" }} />{" "}
        </IconButton>
      </Tooltip>
      <Tooltip title={i18n.t("appBarListem.chats")}>
        <IconButton
          component={RouterLink}
          to="/chats"
          size="small"
          style={{
            borderRadius: selectedSubMenu[2] ? 5 : 80,
            paddingInline: selectedSubMenu[2] ? "5px" : 2,
            fontSize: "12px",
            color: "#FFF",
            fontFamily: "Poppins",
          }}
        >
          <MessageFavorite style={{ width: "20px", height: "20px" }} />{" "}
        </IconButton>
      </Tooltip>
      {/* Bots */}
      {user.profile === "admin" && (
        <Tooltip title={i18n.t("appBarListem.chatBots")}>
          <IconButton
            component={RouterLink}
            to="/queues"
            size="small"
            style={{
              borderRadius: selectedSubMenu[2] ? 5 : 80,
              paddingInline: selectedSubMenu[2] ? "5px" : 2,
              fontSize: "12px",
              color: "#FFF",
              fontFamily: "Poppins",
            }}
          >
            <ArrowSquare style={{ width: "20px", height: "20px" }} />{" "}
          </IconButton>
        </Tooltip>
      )}

      {/* <SearchInput /> */}

      {/* Menu Setting */}
      {user.profile === "admin" && (
        <Tooltip title={i18n.t("appBarListem.settings")}>
          <IconButton
            color="inherit"
            size="small"
            onClick={(event) => handleMenuClick(event, 1)}
            style={{
              borderRadius: selectedSubMenu[0] ? 5 : 80,
              paddingInline: selectedSubMenu[0] ? "5px" : 2,
              fontSize: "14px",
              color: "#FFF",
              fontFamily: "Poppins",
            }}
          >
            <Setting2 style={{ width: "20px", height: "20px" }} />
            <AnimatePresence>
              {selectedSubMenu[1] && (
                <motion.span
                  key="submenu-1"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginLeft: 4,
                    display: "inline-block",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: "14px",
                    fontFamily: "Poppins",
                  }}
                >
                  {selectedSubMenu[1]}
                </motion.span>
              )}
            </AnimatePresence>
          </IconButton>
        </Tooltip>
      )}

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={activeButton === 1}
        onClose={handleMenuClose}
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
          onClick={handleSubmenuOpen}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Campanhas</span>
          <ArrowRight />
        </MenuItem>

        <Menu
          anchorEl={submenuAnchorEl}
          keepMounted
          open={Boolean(submenuAnchorEl)}
          onClose={handleSubmenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right", // Âncora o submenu à direita do item
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left", // O submenu se expande da esquerda para a direita
          }}
        >
          <MenuItem
            onClick={() => {
              handleSubMenuClick("Listagem", 1);
              handleSubmenuClose();
            }}
            component={RouterLink}
            to="/campaigns"
          >
            Listagem
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSubMenuClick("Lista de contatos", 1);
              handleSubmenuClose();
            }}
            component={RouterLink}
            to="/contact-lists"
          >
            Lista de contatos
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSubMenuClick("Configurações", 1);
              handleSubmenuClose();
            }}
            component={RouterLink}
            to="/campaigns-config"
          >
            Configurações
          </MenuItem>
        </Menu>

        <MenuItem
          component={RouterLink}
          to="/NotifyMe"
          onClick={() => handleSubMenuClick("Notificação do usuário", 1)}
        >
          Notificação do usuário
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/announcements"
          onClick={() => handleSubMenuClick("Informativos", 1)}
        >
          Informativos
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/messages-api"
          onClick={() => handleSubMenuClick("API", 1)}
        >
          API
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/users"
          onClick={() => handleSubMenuClick("Usuários", 1)}
        >
          Usuários
        </MenuItem>
        {/* <MenuItem
          component={RouterLink}
          to="/queues"
          onClick={() => handleSubMenuClick(" Filas & ChatsBots", 1)}
        >
          Filas & ChatsBots
        </MenuItem> */}
        <MenuItem
          component={RouterLink}
          to="/prompts"
          onClick={() => handleSubMenuClick("Talk.Ai", 1)}
        >
          Talk.Ai
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSubMenuClick("Fluxo de campanhas", 1);
            handleSubmenuClose();
          }}
          component={RouterLink}
          to="/phrase-lists"
        >
          Fluxo de campanhas
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSubMenuClick("Fluxo de conversa", 1);
            handleSubmenuClose();
          }}
          component={RouterLink}
          to="/flowbuilders"
        >
          Fluxo de conversa
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/queue-integration"
          onClick={() => handleSubMenuClick("Integrações", 1)}
        >
          Integrações
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/connections"
          onClick={() => handleSubMenuClick("Conexões", 1)}
        >
          Conexões
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/allConnections"
          onClick={() => handleSubMenuClick("Gerenciar conexões", 1)}
        >
          Gerenciar conexões
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/files"
          onClick={() => handleSubMenuClick("Lista de arquivos", 1)}
        >
          Lista de arquivos
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/financeiro"
          onClick={() => handleSubMenuClick("Financeiro", 1)}
        >
          Financeiro
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/settings"
          onClick={() => handleSubMenuClick("Configurações", 1)}
        >
          Configurações
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/companies"
          onClick={() => handleSubMenuClick("Empresas", 1)}
        >
          Empresas
        </MenuItem>
      </Menu>
    </div>
  );
}
