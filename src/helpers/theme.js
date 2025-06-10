import { createTheme } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles/colorManipulator";

const theme = createTheme({
  overrides: {
    MuiContainer: {
      root: {
        maxWidth: "xl",
      },
    },
    MuiTableRow: {
      root: {
        "&$selected": {
          backgroundColor: "rgba(0, 0, 0, 0.075)",
        },
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "0 .15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important",
      },
    },
    MuiCard: {
      root: {
        border: "none",
      },
    },
    MuiDrawer: {
        docked: {
          // Target the specific Grid toolbar inside the drawer
          '&[class*="JournalDrawer"]': {
            display: 'none',
          },
        },
    },
    MuiToolbar: {
      root: {
        "& .MuiButtonBase-root": {
          color: "#ffffff !important",
        }
      },
    },
    MuiTablePagination: {
      actions: {
        color: "#858796",
        "& .MuiIconButton-root": {
          color: "#858796",
          "&:hover": {
            backgroundColor: "#eaecf4",
            color: "#4e73df",
          },
          "&.Mui-disabled": {
            color: "rgba(133, 135, 150, 0.3)",
          },
          "& .MuiSvgIcon-root": {
            fill: "#858796",  // Explicitly set SVG fill color
            "&:hover": {
              fill: "#4e73df", // Change color on hover
            }
          }
        }
      },
    },
    MuiAccordion: {
      root:  {
        boxShadow: "none !important",
      }
    },
    MuiAccordionSummary: {
      root:  {
        backgroundColor: "#ffffff !important",
        "&.Mui-expanded": {
          "border-right": "4px solid #4e73df !important",
        },
        boxShadow: "none !important",
        padding: "0 !important",
      },
    },
    MuiAccordionDetails: {
      root:  {
        padding: "0 !important",
      }
    },
    MuiTableHead: {
      root:  {
        backgroundColor: "#4e73df",
        "& .MuiBox-root": {
          color: "#ffffff !important"
        }
      }
    },
    MuiListItemIcon: {
      root:  {
        minWidth: "32px !important",
      }
    },
    MuiTab: {
      root: {
        "&.Mui-selected": {
          "border-bottom": "4px solid #4e73df !important",
        }
      },
    },
    MuiSvgIcon: {
      root: {
        // Ensure SVG icons are visible in table pagination
        "&.MuiTablePagination-selectIcon, .MuiTablePagination-actions &": {
          fill: "#858796",
        }
      }
    },
  },
  palette: {
    primary: { main: "#4e73df" },    // Bootstrap primary blue
    secondary: { main: "#858796" },  // Bootstrap secondary gray
    success: { main: "#1cc88a" },    // Bootstrap success green
    info: { main: "#36b9cc" },       // Bootstrap info cyan
    warning: { main: "#f6c23e" },    // Bootstrap warning yellow
    danger: { main: "#e74a3b" },     // Bootstrap danger red
    light: { main: "#f8f9fc" },      // Bootstrap light gray
    dark: { main: "#5a5c69" },       // Bootstrap dark gray
    error: { main: "#e74a3b" },      // Using danger red for error state
    text: {
      primary: "#858796",            
      secondary: "#858796",          
      disabled: "#858796",
    },
    background: {
      default: "#f8f9fc",
      paper: "#ffffff",
    },
    divider: "#e3e6f0",
    toggledButton: "#858796",
  },
  typography: {
    fontFamily: ["Nunito", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    useNextVariants: true,
    h1: {
      fontSize: "1.75rem",
      fontWeight: 400,
      color: "#5a5c69",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 400,
      color: "#5a5c69",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 400,
      color: "#5a5c69",
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: 400,
      color: "#5a5c69",
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: 400,
      color: "#5a5c69",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#5a5c69",
    },
    subtitle1: {
      color: "#858796",
    },
    subtitle2: {
      color: "#858796",
    },
    body1: {
      color: "#858796",
    },
    body2: {
      color: "#858796",
    },
    title: {
      fontSize: 20,
      fontWeight: 300,
      color: "#5a5c69",
    },
    label: {
      color: "#858796",
    },
    button: {
      fontWeight: 500,
    },
    caption: {
      color: "#858796",
    },
    overline: {
      color: "#858796",
    },
  },
  jrnlDrawer: {
    open: {
      width: 500,
    },
    close: {
      width: 0,
    },
    itemDetail: {
      marginLeft: 8,
    },
    iconSize: 24,
  },
  menu: {
    variant: "AppBar",
    drawer: {
      width: 240,
      backgroundColor: "#ffffff",
      color: "#858796",
      fontSize: "0.85rem",
      item: {
        padding: "0.75rem 1rem",
        color: "#858796",
        borderLeft: "0",
        borderBottom: "1px solid #e3e6f0",
        fontWeight: 400,
        hover: {
          backgroundColor: "#eaecf4",
          borderRight: ".25rem solid #4e73df",
          color: "#4e73df",
        },
        active: {
          backgroundColor: "#ffffff",
          color: "#4e73df",
          borderRight: ".25rem solid #4e73df",
        },
      },
      root: {
        color: "#858796",
        borderLeft: "0",
        borderBottom: "1px solid #e3e6f0",
        "&$selected": {
          backgroundColor: "#ffffff",
          color: "#4e73df",
          borderRight: ".25rem solid #4e73df",
        },
        "&:hover": {
          backgroundColor: "#eaecf4",
          color: "#4e73df",
          borderRight: ".25rem solid #4e73df",
        },
      },
      submenu: {
        backgroundColor: "#f8f9fc",
        padding: "0.5rem 0",
        item: {
          padding: "0.5rem 1rem 0.5rem 2rem",
          color: "#858796",
          fontSize: "0.85rem",
          borderLeft: "0",
          "&:hover": {
            backgroundColor: "#eaecf4",
            color: "#4e73df",
          },
          "&$selected": {
            backgroundColor: "#ffffff",
            color: "#4e73df",
          },
        },
      },
    },
    appBar: {
      height: 70,
      backgroundColor: "#ffffff",
      color: "#858796",
      fontSize: "0.85rem",
      boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)",
      borderBottom: "1px solid #e3e6f0",
      toolbar: {
        minHeight: 70,
        padding: "0 1rem",
      },
      button: {
        color: "#858796",
        "&:hover": {
          backgroundColor: "#eaecf4",
          color: "#4e73df",
        },
      },
      icon: {
        color: "#858796",
        "&:hover": {
          color: "#4e73df",
        },
      },
    },
  },
  table: {
    title: {
      padding: 10,
    },
    header: {
      color: "#5a5c69",
      fontWeight: 500,
      align: "center",
    },
    headerAction: {
      padding: 5,
    },
    row: {
      color: "#858796",
      align: "center",
      "&:nth-of-type(odd)": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      },
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.075) !important",
      },
    },
    cell: {
      padding: "0.75rem",
      borderBottom: "1px solid #e3e6f0",
    },
    lockedRow: {
      background: "repeating-linear-gradient(45deg, #D3D3D3 1px, #D3D3D3 1px, #fff 10px, #fff 10px)",
    },
    lockedCell: {},
    highlightedRow: {
      backgroundColor: "#e3f2fd !important",
    },
    highlightedCell: {
      fontWeight: 500,
      align: "center",
    },
    secondaryHighlightedRow: {
      backgroundColor: "#bbdefb !important",
    },
    secondaryHighlightedCell: {},
    highlightedAltRow: {},
    highlightedAltCell: {
      fontStyle: "italic",
      align: "center",
    },
    disabledRow: {},
    disabledCell: {
      color: "#858796",
      align: "center",
    },
    footer: {
      color: "#858796",
      backgroundColor: "#f8f9fc",
      borderTop: "2px solid #e3e6f0",
    },
    pager: {
      color: "#858796",
    },
  },
  paper: {
    paper: {
      margin: 10,
      backgroundColor: "#f8f9fc",
    },
    header: {
      padding: "0.75rem 1.25rem",
      backgroundColor: "#f8f9fc",
      borderBottom: "1px solid #e3e6f0",
      color: "#5a5c69",
    },
    message: {
      backgroundColor: "#f8f9fc",
    },
    title: {
      padding: 10,
      fontSize: "1.75rem",
      color: "#5a5c69",
      backgroundColor: "#f8f9fc",
    },
    action: {
      padding: 5,
    },
    divider: {
      padding: 0,
      margin: 0,
    },
    body: {
      marginTop: 10,
      backgroundColor: "#ffffff",
      padding: "1.25rem",
    },
    item: {
      padding: 10,
    },
  },
  formTable: {
    table: {
      color: "#858796",
    },
    actions: {
      color: "#858796",
    },
    header: {
      color: "#858796",
      align: "center",
    },
  },
  form: {
    spacing: 10,
    input: {
      backgroundColor: "#f8f9fc",
      border: "none",
      borderRadius: "0.35rem",
      padding: "0.375rem 0.75rem",
      fontSize: "1rem",
      color: "#6e707e",
      "&:focus": {
        backgroundColor: "#ffffff",
        boxShadow: "0 0 0 0.2rem rgba(78, 115, 223, 0.25)",
        border: "none",
      },
    },
    label: {
      color: "#858796",
      fontSize: "0.85rem",
      fontWeight: 400,
    },
  },
  dialog: {
    title: {
      fontWeight: 500,
      color: "#5a5c69",
    },
    content: {
      padding: "1.25rem",
    },
    primaryButton: {
      backgroundColor: "#4e73df",
      color: "#ffffff",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: alpha("#4e73df", 0.9),
        color: "#ffffff",
      },
    },
    secondaryButton: {
      backgroundColor: "#858796",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: alpha("#858796", 0.9),
        color: "#ffffff",
      },
    },
  },
  tooltipContainer: {
    position: 'fixed',
    bottom: 15,
    right: 8,
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  flexTooltip: {
    marginBottom: 5,
  },
  fab: {
    position: "fixed",
    bottom: 20,
    right: 8,
    zIndex: 2000,
  },
  fakeInput: {},
  bigAvatar: {
    width: 160,
    height: 160,
  },
  buttonContainer: {
    horizontal: {
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "auto",
      justifyContent: "flex-end",
    },
  },
  page: {
    padding: 16,
    locked: {
      background: "repeating-linear-gradient(45deg, #D3D3D3 1px, #D3D3D3 1px, #fff 10px, #fff 10px)",
    },
    paddingBottom: 80,
  },
});

export default theme;