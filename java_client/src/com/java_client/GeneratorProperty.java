/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.java_client;

/**
 *
 * @author xgao
 */
public enum GeneratorProperty {
    
        /* THESE ARE THE NODES IN OUR APP */
    // FOR SIMPLE OK/CANCEL DIALOG BOXES
    OH_OK_PROMPT,
    OH_CANCEL_PROMPT,

    // THESE ARE FOR TEXT PARTICULAR TO THE APP'S WORKSPACE CONTROLS
    OH_LEFT_PANE,
    OH_TAS_HEADER_PANE,
    OH_TAS_HEADER_LABEL,
    OH_GRAD_UNDERGRAD_TAS_PANE,
    OH_ALL_RADIO_BUTTON,
    OH_GRAD_RADIO_BUTTON,
    OH_UNDERGRAD_RADIO_BUTTON,
    OH_TAS_HEADER_TEXT_FIELD,
    OH_TAS_TABLE_VIEW,
    OH_NAME_TABLE_COLUMN,
    OH_EMAIL_TABLE_COLUMN,
    OH_SLOTS_TABLE_COLUMN,
    OH_TYPE_TABLE_COLUMN,
    GENERATOR_SCHEDULE_UPDATE_BUTTON,

    OH_ADD_TA_PANE,
    OH_NAME_TEXT_FIELD,
    OH_EMAIL_TEXT_FIELD,
    OH_ADD_TA_BUTTON,

    OH_RIGHT_PANE,
    OH_OFFICE_HOURS_HEADER_PANE,
    OH_OFFICE_HOURS_HEADER_LABEL,
    OH_OFFICE_HOURS_TABLE_VIEW,
    OH_START_TIME_TABLE_COLUMN,
    OH_END_TIME_TABLE_COLUMN,
    OH_MONDAY_TABLE_COLUMN,
    OH_TUESDAY_TABLE_COLUMN,
    OH_WEDNESDAY_TABLE_COLUMN,
    OH_THURSDAY_TABLE_COLUMN,
    OH_FRIDAY_TABLE_COLUMN,
    OH_DAYS_OF_WEEK,
    OH_FOOLPROOF_SETTINGS,
    GENERATOR_SCHEDULE_UPDATE_BUTTON_TEXT,
    
    // FOR THE EDIT DIALOG
    OH_TA_EDIT_DIALOG,
    OH_TA_DIALOG_GRID_PANE,
    OH_TA_DIALOG_HEADER_LABEL, 
    OH_TA_DIALOG_NAME_LABEL,
    OH_TA_DIALOG_NAME_TEXT_FIELD,
    OH_TA_DIALOG_EMAIL_LABEL,
    OH_TA_DIALOG_EMAIL_TEXT_FIELD,
    OH_TA_DIALOG_TYPE_LABEL,
    OH_TA_DIALOG_TYPE_BOX,
    OH_TA_DIALOG_GRAD_RADIO_BUTTON,
    OH_TA_DIALOG_UNDERGRAD_RADIO_BUTTON,
    OH_TA_DIALOG_OK_BOX,
    OH_TA_DIALOG_OK_BUTTON, 
    OH_TA_DIALOG_CANCEL_BUTTON, 
    
    // THESE ARE FOR ERROR MESSAGES PARTICULAR TO THE APP
    OH_NO_TA_SELECTED_TITLE, OH_NO_TA_SELECTED_CONTENT,
    
    GENERATOR_MAIN_TABPANE,
    GENERATOR_OH_TAB,
    GENERATOR_SITE_TAB,
    GENERATOR_SYLLABUS_TAB,
    GENERATOR_MEETING_TAB,
    GENERATOR_SCHEDULE_TAB,
    GENERATOR_OH_TAB_VBOX,
    GENERATOR_OH_TA_EXPAND_BUTTON,
    GENERATOR_OH_START_TIME_LABEL,
    GENERATOR_OH_END_TIME_LABEL,
    GENERATOR_OH_START_TIME_COMBO,
    GENERATOR_OH_END_TIME_COMBO,
    GENERATOR_OH_START_TIME_DEFAULT,
    GENERATOR_OH_END_TIME_DEFAULT,
    GENERATOR_FIRST_COMBO_OPTION,
    GENERATOR_SECOND_COMBO_OPTION,
    GENERATOR_SITE_TAB_BOX,
    GENERATOR_SITE_HEADER_LABEL,
    GENERATOR_SITE_LABEL,
    GENERATOR_SITE_BANNER_HBOX,
    GENERATOR_SITE_SUBJECTHBOX,
    GENERATOR_SITE_SUBJECT_COMBOBOX,
    GENERATOR_SITE_SUBJECT_LABEL,
    GENERATOR_SUBEJECT_OPTIONS,
    GENERATOR_SUBEJECT_DEFAULT,
    GENERATOR_SITE_BANNER_HEADER,
    GENERATOR_SITE_NUMBER_LABEL,
    GENERATOR_SITE_SEMESTER_HBOX,
    GENERATOR_SITE_SEMESTER_LABEL,
    GENERATOR_SITE_SEMESTER_COMBOBOX,
    GENERATOR_SEMESTER_OPTIONS,
    GENERATOR_SITE_NUMBER_COMBOBOX,
    GENERATOR_NUMBER_OPTIONS,
    GENERATOR_NUMBER_DEFAULT,
    GENERATOR_SEMESTER_DEFAULT,
    GENERATOR_SITE_YEAR_LABEL,
    GENERATOR_YEAR_DEFAULT,
    GENERATOR_YEAR_OPTIONS,
    GENERATOR_SITE_YEAR_COMBOBOX,
    GENERATOR_PAGE_HBOX,
    GENERATOR_SITE_PAGE_HEADER,
    GENERATOR_SITE_HOME_CHECKBOX,
    GENERATOR_SITE_SYLLABUS_CHECKBOX,
    GENERATOR_SITE_SCHEDULE_CHECKBOX,
    GENERATOR_SITE_HOMEWORK_CHECKBOX,
    GENERATOR_SITE_STYLE_HBOX,
    GENERATOR_SITE_FAVICON_BOX,
    SITE_FAVICON,
    SITE_FAVICON_BUTTON,
    SITE_NAVBAR_BUTTON,
    SITE_NAVICON,
    GENERATOR_SITE_NAV_BOX,
    GENERATOR_SITE_STYLE_HEADER,
    GENERATOR_SITE_LEFT_FOOTER_BOX,
    SITE_LEFT_FOOTER_BUTTON,
    SITE_LEFT_FOOTERCON,
    GENERATOR_SITE_RIGHT_FOOTER_BOX,
    SITE_RIGHT_FOOTER_BUTTON,
    SITE_RIGHT_FOOTERCON,
    GENERATOR_SITE_FONTCOLOR_SUBHEADER,
    GENERATOR_SITE_FONTS_BOX,
    GENERATOR_SITE_CSS_COMBOBOX,
    GENERATOR_CSS_OPTIONS,
    GENERATOR_CSS_DEFAULT,
    GENERATOR_SITE_NOTE_BOX,
    GENERATOR_SITE_NOTE_SUBHEADER,
    GENERATOR_SITE_INSTRUCTOR_HBOX,
    GENERATOR_SITE_INSTRUCTOR_HEADER,
    GENERATOR_SITE_NAME_BOX,
    GENERATOR_SITE_NAME_LABEL,
    GENERATOR_SITE_NAME_TEXTFIELD,
    GENERATOR_SITE_EMAIL_LABEL,
    GENERATOR_SITE_EMAIL_TEXTFIELD,
    GENERATOR_SITE_ROOM_LABEL,
    GENERATOR_SITE_ROOM_TEXTFIELD,
    GENERATOR_SITE_EMAIL_BOX,
    GENERATOR_SITE_HOME_PAGE_LABEL,
    GENERATOR_SITE_HOME_PAGE_TEXTFIELD,
    GENERATOR_SITE_EXPAND_BOX,
    GENERATOR_SITE_OFFICE_HOURS_EXPAND_BUTTON,
    GENERATOR_SITE_OFFICE_HOURS_LABEL,
    GENERATOR_SITE_TEXT_AREA_BOX,
    GENERATOR_SITE_OFFICE_HOURS_TEXT_AREA,
    GENERATOR_SYLLABUS_DESCRIPTION_BOX,
    GENERATOR_SYLLABUS_EXPAND_BUTTON_DESCRIPTION,
    GENERATOR_SYLLABUS_AREA_DECSRCIPTION,
    GENERATOR_SYLLABUS_DECSRIPTION_EXPAND_BOX,
    GENERATOR_SYLLABUS_TOPIC_BOX,
    GENERATOR_SYLLABUS_DESCRIPTION_LABEL,
    GENERATOR_SYLLABUS_TOPIC_EXPAND_BOX,
    GENERATOR_SYLLABUS_EXPAND_BUTTON_TOPIC,
    GENERATOR_SYLLABUS_AREA_TOPIC,
    GENERATOR_SYLLABUS_TOPIC_LABEL,
    GENERATOR_SYLLABUS_PERE_BOX,
    GENERATOR_SYLLABUS_PERE_EXPAND_BOX,
    GENERATOR_SYLLABUS_EXPAND_BUTTON_PERE,
    GENERATOR_SYLLABUS_PERE_LABEL,
    GENERATOR_SYLLABUS_AREA_PERE,
    GENERATOR_SYLLABUS_OUT_BOX,
    GENERATOR_SYLLABUS_OUT_EXPAND_BOX,
    GENERATOR_SYLLABUS_EXPAND_BUTTON_OUT,
    GENERATOR_SYLLABUS_OUT_LABEL,
    GENERATOR_SYLLABUS_AREA_OUT,
    GENERATOR_SYLLABUS_BOOK_BOX,
    GENERATOR_SYLLABUS_BOOK_EXPAND_BOX,
    GENERATOR_SYLLABUS_EXPAND_BUTTON_BOOK,
    GENERATOR_SYLLABUS_BOOK_LABEL,
    GENERATOR_SYLLABUS_AREA_BOOK,
    GENERATOR_SYLLABUS_GRADE_BOX,
    GENERATOR_SYLLABUS_GRADE_EXPAND_BOX,
    GENERATOR_SYLLABUS_EXPAND_BUTTON_GRADE,
    GENERATOR_SYLLABUS_GRADE_LABEL,
    GENERATOR_SYLLABUS_AREA_GRADE,
    GENERATOR_SYLLABUS_NOTE_BOX,
    GENERATOR_SYLLABUS_NOTE_EXPAND_BOX,
    GENERATOR_SYLLABUS_EXPAND_BUTTON_NOTE,
    GENERATOR_SYLLABUS_NOTE_LABEL,
    GENERATOR_SYLLABUS_AREA_NOTE,
    GENERATOR_SYLLABUS_DISHONESTY_BOX,
    GENERATOR_SYLLABUS_DISHONESTY_EXPAND_BOX,
    GENERATOR_SYLLABUS_EXPAND_BUTTON_DISHONESTY,
    GENERATOR_SYLLABUS_DISHONESTY_LABEL,
    GENERATOR_SYLLABUS_AREA_DISHONESTY,
    GENERATOR_SYLLABUS_ASIS_BOX,
    GENERATOR_SYLLABUS_ASIS_EXPAND_BOX,
    GENERATOR_SYLLABUS_EXPAND_BUTTON_ASIS,
    GENERATOR_SYLLABUS_ASIS_LABEL,
    GENERATOR_SYLLABUS_AREA_ASIS,
    GENERATOR_SYLLABUS_TAB_BOX,
    GENERATOR_MEETING_TAB_BOX,
    GENERATOR_MEETING_LECTURE_BOX,
    GENERATOR_MEETING_LECTURE_HEADER_BOX,
    GENERATOR_MEETING_LECTURE_MINUS_BUTTON,
    GENERATOR_MEETING_LECTURE_PLUS_BUTTON,
    GENERATOR_MEETING_LECTURE_LABEL,
    GENERATOR_LECTURE_TABLE_VIEW,
    GENERATOR_SEC_TABLE_COLUMN,
    GENERATOR_DAY_TABLE_COLUMN,
    GENERATOR_TIME_TABLE_COLUMN,
    GENERATOR_ROOM_TABLE_COLUMN,
    GENERATOR_MEETING_RECITATION_BOX,
    GENERATOR_MEETING_RECITATION_PLUS_BUTTON,
    GENERATOR_MEETING_RECITATION_MINUS_BUTTON,
    GENERATOR_RECITATION_TABLE_VIEW,
    GENERATOR_SEC1_TABLE_COLUMN,
    GENERATOR_DAY1_TABLE_COLUMN,
    GENERATOR_ROOM1_TABLE_COLUMN,
    GENERATOR_TA1_TABLE_COLUMN,
    GENERATOR_TA2_TABLE_COLUMN,
    GENERATOR_MEETING_RECITATION_LABEL,
    GENERATOR_MEETING_LAB_BOX,
    GENERATOR_MEETING_LAB_HEADER_BOX,
    GENERATOR_MEETING_LAB_PLUS_BUTTON,
    GENERATOR_MEETING_LAB_MINUS_BUTTON,
    GENERATOR_MEETING_LAB_LABEL,
    GENERATOR_LAB_TABLE_VIEW,
    GENERATOR_SEC2_TABLE_COLUMN,
    GENERATOR_DAY2_TABLE_COLUMN,
    GENERATOR_ROOM2_TABLE_COLUMN,
    GENERATOR_TA1_TABLE_COLUMN1,
    GENERATOR_TA2_TABLE_COLUMN1,
    GENERATOR_SCHEDULE_TAB_BOX,
    GENERATOR_SCHEDULE_CALENDERBOX,
    GENERATOR_SCHEDULE_ADDBOX,
    GENERATOR_SCHEDULE_ITEM,
    GENERATOR_SCHEDULE_CALENDER_HEADER,
    GENERATOR_SCHEDULE_STARTING_SUB_HBOX,
    GENERATOR_SCHEDULE_STARTING_LABEL,
    GENERATOR_SCHEDULE_STARTING_COMBO,
    GENERATOR_SCHEDULE_STARTING_COMBO_DEFAULT,
    GENERATOR_SCHEDULE_ENDING_SUB_HBOX,
    GENERATOR_SCHEDULE_ENDING_LABEL,
    GENERATOR_SCHEDULE_ENDING_COMBO,
    GENERATOR_SCHEDULE_ENDING_COMBO_DEFAULT,
    GENERATOR_SCHEDULE_ITEM_EXPAND_BOX,
    GENERATOR_SCHEDULE_ITEM_REMOVE_BUTTON,
    GENERATOR_SCHEDULE_ITEM_EXPAND_LABEL,
    GENERATOR_SCHEDULE_ITEM_TABLE,
    GENERATOR_SCHEDULE_TYPE_COLUMN,
    GENERATOR_SCHEDULE_DATE_COLUMN,
    GENERATOR_SCHEDULE_TITLE_COLUMN,
    GENERATOR_SCHEDULE_TOPIC_COLUMN,
    GENERATOR_SCHEDULE_ADD_LABEL,
    GENERATOR_SCHEDULE_TYPE_COMBO_HBOX,
    GENERATOR_SCHEDULE_TYPE_LABEL,
    GENERATOR_SCHEDULE_TYPE_COMBOBOX,
    GENERATOR_SCHEDULE_TYPE_COMBO_OPTION,
    GENERATOR_SCHEDULE_TYPE_COMBO_DEAFULT,
    GENERATOR_SCHEDULE_DATE_COMBO_HBOX,
    GENERATOR_SCHEDULE_DATE_LABEL,
    GENERATOR_SCHEDULE_DATE_COMBOBOX,
    GENERATOR_SCHEDULE_DATE_COMBO_DEAFULT,
    GENERATOR_SCHEDULE_TITLE_HBOX,
    GENERATOR_SCHEDULE_TITLE_LABEL,
    GENERATOR_SCHEDULE_TITLE_TEXTFIELD,
    GENERATOR_SCHEDULE_TOPIC_HBOX,
    GENERATOR_SCHEDULE_TOPIC_LABEL,
    GENERATOR_SCHEDULE_TOPIC_TEXTFIELD,
    GENERATOR_SCHEDULE_LINK_HBOX,
    GENERATOR_SCHEDULE_LINK_LABEL,
    GENERATOR_SCHEDULE_LINK_TEXTFIELD,
    GENERATOR_SCHEDULE_ADD_BUTTON_HBOX,
    GENERATOR_SCHEDULE_ADD_BUTTON,
    GENERATOR_SCHEDULE_CLEAR_BUTTON,
    GENERATOR_SITE_EXPORT_BOX,
    GENERATOR_SITE_EXPORT_LABEL

    
    
}