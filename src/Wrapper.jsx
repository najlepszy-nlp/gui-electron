import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import App from "./App";

export default function Wrapper () {
    return <FluentProvider theme={webDarkTheme}>
        <App/>
    </FluentProvider>
}