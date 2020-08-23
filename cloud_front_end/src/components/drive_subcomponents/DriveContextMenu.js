import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import {DIRECTORY_PANE_ID} from "../../common/constants";
import 'react-contexify/dist/ReactContexify.min.css';
import React from "react";

const DriveContextMenu = () => (
    <Menu id={DIRECTORY_PANE_ID} animation={"flip"}>
        <Item onClick={()=>console.log("lorem")}>Lorem</Item>
        <Item onClick={()=>console.log("Ipsum")}>Ipsum</Item>
        <Separator />
        <Item disabled>Dolor</Item>
        <Separator />
        <Submenu label="Foobar">
            <Item onClick={()=>console.log("foo")}>Foo</Item>
            <Item onClick={()=>console.log("bar")}>Bar</Item>
        </Submenu>
    </Menu>
);

const DriveContextMenuProvider = ({component: Component, ...rest}) =>(
    <MenuProvider id={DIRECTORY_PANE_ID}>
        <Component {...rest} />
    </MenuProvider>
);


export {DriveContextMenu, DriveContextMenuProvider};