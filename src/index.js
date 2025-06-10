import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, LinearProgress, Typography } from "@material-ui/core";
import { Provider } from "react-redux";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { QueryClient, QueryClientProvider } from "react-query";
import * as serviceWorker from "./serviceWorker";
import theme from "./helpers/theme";
import store from "./helpers/store";
import LocalesManager from "./LocalesManager";
import ModulesManager from "./ModulesManager";
import ModulesManagerProvider from "./ModulesManagerProvider";
import { App, baseApiUrl, apiHeaders } from "@openimis/fe-core";
import messages_ref from "./translations/ref.json";
import "./index.css";
import logo from "./openIMIS.png";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const loadConfiguration = async () => {
  const response = await fetch(`${baseApiUrl}/graphql`, {
    method: "post",
    headers: apiHeaders(),
    body: JSON.stringify({ "query": "{ moduleConfigurations { module, config, controls{ field, usage } } }" }),
  });
  if (!response.ok) {
    throw response;
  } else {
    const { data } = await response.json();
    data.moduleConfigurations.unshift({});
    const out = data.moduleConfigurations.reduce((acc, c) => {
      try {
        acc[c.module] = { controls: c.controls, ...JSON.parse(c.config) };
      } catch (error) {
        console.error(`Failed to parse module ${c.module} config`, error);
      }
      return acc;
    });
    return out;
  }
};

const AppContainer = () => {
  const [appState, setAppState] = React.useState({ isLoading: true, config: undefined, error: null });
  const localesManager = new LocalesManager();

  useEffect(() => {
    loadConfiguration().then(
      (config) =>
        setAppState({
          error: null,
          isLoading: false,
          config,
        }),
      (error) =>
        setAppState({
          error,
          isLoading: false,
        }),
    );
  }, []);

  if (appState.isLoading) {
    return (
      <MuiThemeProvider theme={theme}>
        <LinearProgress className="bootstrap" />
      </MuiThemeProvider>
    );
  } else if (appState.error) {
    // Simple error display without using hooks that require context
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ 
          textAlign: 'center', 
          height: '70vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <img src={logo} alt="Logo of openIMIS" style={{ maxHeight: '128px', margin: '16px' }} />
          <Typography variant="h1" style={{ margin: '16px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            {appState.error.status || 'Error'}
          </Typography>
          <Typography variant="h2" style={{ margin: '16px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Fatal Error
          </Typography>
          <Typography variant="body1" style={{ margin: '16px', fontSize: '18px' }}>
            {appState.error.statusText || 'An unexpected error occurred'}
          </Typography>
        </div>
      </MuiThemeProvider>
    );
  } else {
    const modulesManager = new ModulesManager(appState.config);
    const reducers = modulesManager.getContribs("reducers").reduce((reds, red) => {
      reds[red.key] = red.reducer;
      return reds;
    }, []);

    const middlewares = modulesManager.getContribs("middlewares");

    return (
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider theme={theme}>
          <Provider store={store(reducers, middlewares)}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <ModulesManagerProvider modulesManager={modulesManager}>
                <App
                  basename={process.env.PUBLIC_URL}
                  localesManager={localesManager}
                  messages={messages_ref}
                  logo={logo}
                />
              </ModulesManagerProvider>
            </MuiPickersUtilsProvider>
          </Provider>
        </MuiThemeProvider>
      </QueryClientProvider>
    );
  }
};

ReactDOM.render(<AppContainer />, document.getElementById("root"));
serviceWorker.register();
