import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { BiTransferAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const settings = [
  {
    label: "Profile",
    path: "/profile",
  },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateToIssuance = () => {
    navigate("/issuance");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            src="https://raw.githubusercontent.com/certinize/assets/main/images/certinize-logo.svg"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              textDecoration: "none",
              textTransform: "none",
            }}
          >
            Certinize
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "black",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigateToIssuance();
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BiTransferAlt size={20} style={{ margin: 5 }} />
                  <Typography variant="subtitle2" textAlign="center">
                    Issue Certificate
                  </Typography>
                </div>
              </MenuItem>
            </Menu>
          </Box>
          <Avatar
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            src="https://raw.githubusercontent.com/certinize/assets/main/images/certinize-logo.svg"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "black",
              textDecoration: "none",
              textTransform: "none",
            }}
          >
            Certinize
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Issue certificate">
              <Button
                onClick={navigateToIssuance}
                sx={{ my: 2, mx: 4, color: "black", alignItems: "center" }}
              >
                <BiTransferAlt
                  size={20}
                  color="black"
                  style={{ marginRight: 10 }}
                />
                Issue Certificate
              </Button>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate(setting.path);
                  }}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
