import { createTheme } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles/colorManipulator";

const defaultColors = {
  primaryColor: "#4e73df",
  secondaryColor: "#858796",
  errorColor: "#e74a3b",
  successColor: "#1cc88a",
  infoColor: "#36b9cc",
  warningColor: "#f6c23e",
  whiteColor: "#ffffff",
  fontColor: "#858796",
  headingColor: "#5a5c69",
  backgroundColor: "#f8f9fc",
  headerColor: "#f8f9fc",
  dividerColor: "#e3e6f0",
  greyColor: "#858796",
  selectedTableRowColor: "rgba(0, 0, 0, 0.075)",
  hoveredTableRowColor: "rgba(0, 0, 0, 0.075)",
  toggledButtonColor: "#858796",
  lockedBackgroundPattern:
    "repeating-linear-gradient(45deg, #D3D3D3 1px, #D3D3D3 1px, #fff 10px, #fff 10px)",
};

const createAppTheme = (colorOverrides = {}) => {
  const {
    primaryColor,
    secondaryColor,
    errorColor,
    successColor,
    infoColor,
    warningColor,
    whiteColor,
    fontColor,
    headingColor,
    backgroundColor,
    headerColor,
    dividerColor,
    greyColor,
    selectedTableRowColor,
    hoveredTableRowColor,
    toggledButtonColor,
    lockedBackgroundPattern,
  } = { ...defaultColors, ...colorOverrides };

  return createTheme({
    overrides: {
      MuiContainer: {
        root: {
          maxWidth: "xl",
        },
      },
      MuiTableRow: {
        root: {
          "&$selected": {
            backgroundColor: selectedTableRowColor,
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
          '&[class*="JournalDrawer"]': {
            display: "none",
          },
        },
      },
      MuiToolbar: {
        root: {
          "& .MuiButtonBase-root": {
            color: "#ffffff !important",
          },
        },
      },
      MuiTablePagination: {
        actions: {
          color: greyColor,
          "& .MuiIconButton-root": {
            color: greyColor,
            "&:hover": {
              backgroundColor: "#eaecf4",
              color: primaryColor,
            },
            "&.Mui-disabled": {
              color: alpha(greyColor, 0.3),
            },
            "& .MuiSvgIcon-root": {
              fill: greyColor,
              "&:hover": {
                fill: primaryColor,
              },
            },
          },
        },
      },
      MuiAccordion: {
        root: {
          boxShadow: "none !important",
        },
      },
      MuiAccordionSummary: {
        root: {
          backgroundColor: whiteColor + " !important",
          "&.Mui-expanded": {
            "border-right": "4px solid " + primaryColor + " !important",
          },
          boxShadow: "none !important",
          padding: "0 !important",
        },
      },
      MuiAccordionDetails: {
        root: {
          padding: "0 !important",
        },
      },
      MuiTableHead: {
        root: {
          backgroundColor: primaryColor,
          "& .MuiBox-root": {
            color: whiteColor + " !important",
          },
        },
      },
      MuiListItemIcon: {
        root: {
          minWidth: "32px !important",
        },
      },
      MuiTab: {
        root: {
          "&.Mui-selected": {
            "border-bottom": "4px solid " + primaryColor + " !important",
          },
        },
      },
      MuiSvgIcon: {
        root: {
          "&.MuiTablePagination-selectIcon, .MuiTablePagination-actions &": {
            fill: greyColor,
          },
        },
      },
    },
    palette: {
      primary: { main: primaryColor },
      secondary: { main: secondaryColor },
      success: { main: successColor },
      info: { main: infoColor },
      warning: { main: warningColor },
      error: { main: errorColor },
      text: {
        primary: fontColor,
        secondary: fontColor,
        second: whiteColor,
        disabled: greyColor,
        error: errorColor,
      },
      background: {
        default: backgroundColor,
        paper: whiteColor,
      },
      divider: dividerColor,
      toggledButton: toggledButtonColor,
    },
    typography: {
      fontFamily: ["Nunito", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"].join(","),
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700,
      useNextVariants: true,
      h1: { fontSize: "1.75rem", fontWeight: 400, color: headingColor },
      h2: { fontSize: "1.5rem", fontWeight: 400, color: headingColor },
      h3: { fontSize: "1.25rem", fontWeight: 400, color: headingColor },
      h4: { fontSize: "1.2rem", fontWeight: 400, color: headingColor },
      h5: { fontSize: "1.1rem", fontWeight: 400, color: headingColor },
      h6: { fontSize: "1rem", fontWeight: 400, color: headingColor },
      subtitle1: { color: greyColor },
      subtitle2: { color: greyColor },
      body1: { color: greyColor },
      body2: { color: greyColor },
      title: { fontSize: 20, fontWeight: 300, color: headingColor },
      label: { color: greyColor },
      button: { fontWeight: 500 },
      caption: { color: greyColor },
      overline: { color: greyColor },
    },
    jrnlDrawer: {
      open: { width: 500 },
      close: { width: 0 },
      itemDetail: { marginLeft: 8 },
      iconSize: 24,
    },
    menu: {
      variant: "AppBar",
      drawer: {
        width: 240,
        backgroundColor: whiteColor,
        color: greyColor,
        fontSize: "0.85rem",
        item: {
          padding: "0.75rem 1rem",
          color: greyColor,
          borderLeft: "0",
          borderBottom: "1px solid " + dividerColor,
          fontWeight: 400,
          hover: {
            backgroundColor: "#eaecf4",
            borderRight: ".25rem solid " + primaryColor,
            color: primaryColor,
          },
          active: {
            backgroundColor: whiteColor,
            color: primaryColor,
            borderRight: ".25rem solid " + primaryColor,
          },
        },
        root: {
          color: greyColor,
          borderLeft: "0",
          borderBottom: "1px solid " + dividerColor,
          "&$selected": {
            backgroundColor: whiteColor,
            color: primaryColor,
            borderRight: ".25rem solid " + primaryColor,
          },
          "&:hover": {
            backgroundColor: "#eaecf4",
            color: primaryColor,
            borderRight: ".25rem solid " + primaryColor,
          },
        },
        submenu: {
          backgroundColor: backgroundColor,
          padding: "0.5rem 0",
          item: {
            padding: "0.5rem 1rem 0.5rem 2rem",
            color: greyColor,
            fontSize: "0.85rem",
            borderLeft: "0",
            "&:hover": {
              backgroundColor: "#eaecf4",
              color: primaryColor,
            },
            "&$selected": {
              backgroundColor: whiteColor,
              color: primaryColor,
            },
          },
        },
      },
      appBar: {
        height: 70,
        backgroundColor: whiteColor,
        color: greyColor,
        fontSize: "0.85rem",
        boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)",
        borderBottom: "1px solid " + dividerColor,
        toolbar: {
          minHeight: 70,
          padding: "0 1rem",
        },
        button: {
          color: greyColor,
          "&:hover": {
            backgroundColor: "#eaecf4",
            color: primaryColor,
          },
        },
        icon: {
          color: greyColor,
          "&:hover": {
            color: primaryColor,
          },
        },
      },
    },
    table: {
      title: {
        padding: 10,
      },
      header: {
        color: headingColor,
        fontWeight: 500,
        align: "center",
      },
      headerAction: {
        padding: 5,
      },
      row: {
        color: greyColor,
        align: "center",
        "&:nth-of-type(odd)": {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
        "&:hover": {
          backgroundColor: hoveredTableRowColor + " !important",
        },
      },
      cell: {
        padding: "0.75rem",
        borderBottom: "1px solid " + dividerColor,
      },
      lockedRow: {
        background: lockedBackgroundPattern,
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
        color: greyColor,
        align: "center",
      },
      footer: {
        color: greyColor,
        backgroundColor: backgroundColor,
        borderTop: "2px solid " + dividerColor,
      },
      pager: {
        color: greyColor,
      },
    },
    paper: {
      paper: {
        margin: 10,
        backgroundColor: backgroundColor,
      },
      header: {
        padding: "0.75rem 1.25rem",
        backgroundColor: headerColor,
        borderBottom: "1px solid " + dividerColor,
        color: headingColor,
      },
      message: {
        backgroundColor: headerColor,
      },
      title: {
        padding: 10,
        fontSize: "1.75rem",
        color: headingColor,
        backgroundColor: headerColor,
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
        backgroundColor: whiteColor,
        padding: "1.25rem",
      },
      item: {
        padding: 10,
      },
    },
    formTable: {
      table: { color: greyColor },
      actions: { color: greyColor },
      header: { color: greyColor, align: "center" },
    },
    form: {
      spacing: 10,
      input: {
        backgroundColor: backgroundColor,
        border: "none",
        borderRadius: "0.35rem",
        padding: "0.375rem 0.75rem",
        fontSize: "1rem",
        color: "#6e707e",
        "&:focus": {
          backgroundColor: whiteColor,
          boxShadow: "0 0 0 0.2rem " + alpha(primaryColor, 0.25),
          border: "none",
        },
      },
      label: {
        color: greyColor,
        fontSize: "0.85rem",
        fontWeight: 400,
      },
    },
    dialog: {
      title: {
        fontWeight: 500,
        color: headingColor,
      },
      content: {
        padding: "1.25rem",
      },
      primaryButton: {
        backgroundColor: primaryColor,
        color: whiteColor,
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: alpha(primaryColor, 0.9),
          color: whiteColor,
        },
      },
      secondaryButton: {
        backgroundColor: greyColor,
        color: whiteColor,
        "&:hover": {
          backgroundColor: alpha(greyColor, 0.9),
          color: whiteColor,
        },
      },
    },
    tooltipContainer: {
      position: "fixed",
      bottom: 15,
      right: 8,
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
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
        background: lockedBackgroundPattern,
      },
      paddingBottom: 80,
    },
  });
};

export default createAppTheme;
