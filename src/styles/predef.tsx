import styles from "./../styles/global_utils.module.scss";

const textfield: string = `${styles.input_textfield} text-sm text-tbfColor-darkergrey rounded-lg p-2 border border-tbfColor-middlegrey3`;
const textarea: string = `${styles.input_textfield}  text-sm resize-none h-20 text-tbfColor-darkergrey rounded-lg p-2 border border-tbfColor-middlegrey3`;

const textfield_full: string = `${styles.input_textfield}  w-full text-sm text-tbfColor-darkergrey rounded-lg p-2 border border-tbfColor-middlegrey3`;
const textarea_full: string = `${styles.input_textfield}  w-full text-sm resize-none h-20 text-tbfColor-darkergrey rounded-lg p-2 border border-tbfColor-middlegrey3`;


export {
    textfield,
    textarea,
    textfield_full,
    textarea_full
}