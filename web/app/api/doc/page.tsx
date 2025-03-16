/*
** EPITECH PROJECT, 2024
** area
** File description:
** page
*/

import React from "react";
import getApiDocs from "@/lib/swagger";
import ReactSwagger from "./react-swagger";
import "./reset.css";

export default async function IndexPage() {

    const spec = await getApiDocs();
    return (
        <ReactSwagger spec={spec}/>
  );
}