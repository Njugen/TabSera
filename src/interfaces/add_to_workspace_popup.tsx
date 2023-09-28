import { iFieldOption } from "./dropdown";

interface iAddToWorkspacePopup {
    title: string,
    dropdownOptions: Array<iFieldOption>,
    onNewWorkspace: () => void,
    onExistingWorkspace: (e: any) => void
    onCancel: () => void
}

export default iAddToWorkspacePopup;