"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7290],{6061:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"technical/7service_breakdown/4reaction","title":"Reaction","description":"Reactions are a specific action that are triggered when a linked action is executed. They are used to perform an action in response to another action. Reactions are used to automate tasks and can be used to create complex workflows.","source":"@site/docs/technical/7service_breakdown/4reaction.md","sourceDirName":"technical/7service_breakdown","slug":"/technical/7service_breakdown/4reaction","permalink":"/AREA/docs/technical/7service_breakdown/4reaction","draft":false,"unlisted":false,"editUrl":"https://github.com/EpitechPromo2027/B-DEV-500-STG-5-1-area-mohamed.mazouz/edit/main/docs/technical/7service_breakdown/4reaction.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"tutorialSidebar","previous":{"title":"Action","permalink":"/AREA/docs/technical/7service_breakdown/3action"},"next":{"title":"Fields","permalink":"/AREA/docs/technical/7service_breakdown/5fields"}}');var o=t(4848),r=t(8453);const a={sidebar_position:4},s="Reaction",c={},d=[{value:"Structure",id:"structure",level:2},{value:"Implementation",id:"implementation",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"reaction",children:"Reaction"})}),"\n",(0,o.jsx)(n.p,{children:"Reactions are a specific action that are triggered when a linked action is executed. They are used to perform an action in response to another action. Reactions are used to automate tasks and can be used to create complex workflows."}),"\n",(0,o.jsx)(n.h2,{id:"structure",children:"Structure"}),"\n",(0,o.jsx)(n.p,{children:"Each Reaction implements the following structure:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"\n\n// The enricher is a function that takes any content and returns the same content with variables replaced by their values\nexport type Enricher = <T extends Record<string, string>>(fields: T) => T;\n\nexport interface Reaction {\n    // The unique identifier of the reaction\n    id: string;\n    // The name of the reaction that is displayed to the user\n    name: string;\n    // The description of the reaction that is displayed to the user\n    description: string;\n    // The fields that are used to configure the reaction\n    fields: Field[];\n    // Same as the action, saves the reaction in the desired database table and returns an id\n    add: (fields: Record<string, string>) => Promise<number>;\n    // called when the linked action is triggered\n    // triggerId is the id of the reaction in the database, the one returned by the add function\n    trigger: (triggerId: number, enrich: Enricher) => Promise<void>;\n}\n\n"})}),"\n",(0,o.jsx)(n.h2,{id:"implementation",children:"Implementation"}),"\n",(0,o.jsx)(n.p,{children:"Here is an example of a reaction generation implementation:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:'class WebHookReaction implements Reaction {\n    id: string;\n\n    name: string;\n\n    description: string;\n\n    fields: Field[];\n\n    constructor() {\n        this.id = "discord_webhook";\n        this.name = "Send a message to a Discord webhook";\n        this.description = "Send a message to a Discord webhook";\n        this.fields = [\n            {\n                id: "webhookUrl",\n                name: "URL of the discord webhook",\n                type: "text_field",\n            },\n            {\n                id: "content",\n                name: "Content of the message",\n                type: "text_field",\n            },\n        ];\n    }\n\n    async add(fields: Record<string, string>): Promise<number> {\n        const db = await client();\n        const { webhookUrl, content } = fields;\n        const inserted = await db\n            .insert(webHookReactionModel)\n            .values({\n                webhookUrl,\n                content,\n            })\n            .returning({ id: webHookReactionModel.id })\n            .execute();\n        await db.$client.release();\n        return inserted[0].id;\n    }\n\n    async trigger(triggerId: number, enrich: Enricher): Promise<void> {\n        const db = await client();\n\n        //retrieve the reaction data from the database\n        const query = await db\n            .select()\n            .from(webHookReactionModel)\n            .where(eq(webHookReactionModel.id, triggerId))\n            .execute();\n        const triggerData = query[0];\n\n        //fullfill the payload with the enriched content\n        const payload : DiscordWebHookPayload = enrich({\n            content: triggerData.content\n        });\n\n        //send the payload to the webhook\n        await fetch(triggerData.webhookUrl, {\n            method: "POST",\n            headers: {\n                "Content-Type": "application/json",\n            },\n            body: JSON.stringify(payload),\n        });\n        await db.$client.release();\n    }\n\n}\n\n// Export a new instance of the reaction\nexport default webHookReaction();\n'})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>s});var i=t(6540);const o={},r=i.createContext(o);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);