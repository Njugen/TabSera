import { iFieldOption } from "./dropdown";

interface iAddToWorkspacePopup {
    dropdownOptions: Array<iFieldOption>,
    onNewWorkspace: () => void,
    onExistingWorkspace: (e: any) => void
    onCancel: () => void,
}

export default iAddToWorkspacePopup;