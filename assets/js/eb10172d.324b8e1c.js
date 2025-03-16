"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4019],{5573:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"technical/7service_breakdown/1oauth","title":"OAuth","description":"OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords. This mechanism is used by Area to authenticate users with third-party services.","source":"@site/docs/technical/7service_breakdown/1oauth.md","sourceDirName":"technical/7service_breakdown","slug":"/technical/7service_breakdown/1oauth","permalink":"/docs/technical/7service_breakdown/1oauth","draft":false,"unlisted":false,"editUrl":"https://github.com/EpitechPromo2027/B-DEV-500-STG-5-1-area-mohamed.mazouz/edit/main/docs/technical/7service_breakdown/1oauth.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Services Breakdown","permalink":"/docs/category/services-breakdown"},"next":{"title":"Service","permalink":"/docs/technical/7service_breakdown/2service"}}');var o=t(4848),r=t(8453);const a={sidebar_position:1},i="OAuth",c={},h=[{value:"Structure",id:"structure",level:2},{value:"Flow",id:"flow",level:3},{value:"Implementation",id:"implementation",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",mermaid:"mermaid",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"oauth",children:"OAuth"})}),"\n",(0,o.jsx)(n.p,{children:"OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords. This mechanism is used by Area to authenticate users with third-party services."}),"\n",(0,o.jsx)(n.p,{children:"A Valid Oauth service must work with code flow and offline refresh token flow. The code flow is used to get the access token and the refresh token, while the refresh token flow is used to get a new access token from the refresh token."}),"\n",(0,o.jsx)(n.p,{children:"A state parameter is generated for each Oauth request to prevent CSRF attacks and let the back-end link the request to the requesting user."}),"\n",(0,o.jsx)(n.h2,{id:"structure",children:"Structure"}),"\n",(0,o.jsx)(n.p,{children:"Each Oauth service implements the following structure:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"interface AccessTokenResponse {\n    access_token: string;\n    token_type: string;\n    expires_in: number;\n    refresh_token: string;\n    scope: string;\n}\n\nexport interface Oauth {\n    // an unique identifier for the service\n    id: string;\n    // a logo or an image representing the service\n    imageURL: string;\n    //generate an oauth url for the service. The state parameter is used to prevent CSRF attacks\n    generateOauth: (state: string) => string;\n    //get the access token from the code returned by the oauth flow\n    getAccessToken: (code: string) => Promise<AccessTokenResponse>;\n    //get a new access token from a refresh token\n    refreshAccessToken: (refreshToken: string) => Promise<AccessTokenResponse>;\n    //returns a string that should let the user recognize the account they are connecting\n    //it can be the username, the email, or any other relevant information\n    getIdentifier: (accessToken: string) => Promise<string>;\n    //revoke (delete) the access token\n    revoke: (accessToken: string) => Promise<void>;\n}\n"})}),"\n",(0,o.jsx)(n.h3,{id:"flow",children:"Flow"}),"\n",(0,o.jsx)(n.p,{children:"URL generation:"}),"\n",(0,o.jsx)(n.mermaid,{value:"sequenceDiagram\n    User->>Backend: Request Oauth\n    Backend->>Redis: generated state\n    Backend->>OauthService: generateOauth(state)\n    OauthService->>User: OauthUrl\n    User->>Backend: Code + state\n    Backend->>OauthService: getAccessToken(code)\n    OauthService->>Backend: AccessTokenResponse\n    Backend->>Redis: state\n    Redis->>Backend: userId\n    Backend--\x3e>Database: AccessTokenResponse + userId\n    Backend->>OauthService: getIdentifier(accessToken)\n    OauthService->>User: Identifier"}),"\n",(0,o.jsx)(n.h2,{id:"implementation",children:"Implementation"}),"\n",(0,o.jsx)(n.p,{children:"Here is an example of a service implementation:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:'class MicrosoftOauth implements Oauth {\n    id = "microsoft";\n\n    scope = "User.Read offline_access Chat.Read Chat.ReadWrite ChannelMessage.Send Team.ReadBasic.All";\n\n    imageURL = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";\n\n    generateOauth(state: string) {\n        const searchParams = new URLSearchParams({\n            client_id: process.env.MICROSOFT_CLIENT_ID!,\n            redirect_uri: "http://localhost:8080/api/auth/microsoft",\n            state,\n            response_type: "code",\n            response_mode: "query",\n            scope: this.scope,\n        });\n        return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${searchParams.toString()}`;\n    };\n\n    async getAccessToken(code: string) {\n        const tokenResponseData = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {\n            method: "POST",\n            body: new URLSearchParams({\n                client_id: process.env.MICROSOFT_CLIENT_ID!,\n                client_secret: process.env.MICROSOFT_CLIENT_SECRET!,\n                code,\n                redirect_uri: "http://localhost:8080/api/auth/microsoft",\n                grant_type: "authorization_code",\n                scope: this.scope,\n            }).toString(),\n            headers: {\n                \'Content-Type\': \'application/x-www-form-urlencoded\',\n                "accept": "application/json",\n            },\n        });\n        const response = await tokenResponseData.json();\n        return response;\n    };\n\n    async refreshAccessToken(refreshToken: string) {\n        const tokenResponseData = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {\n            method: "POST",\n            body: new URLSearchParams({\n                client_id: process.env.MICROSOFT_CLIENT_ID!,\n                client_secret: process.env.MICROSOFT_CLIENT_SECRET!,\n                refresh_token: refreshToken,\n                grant_type: "refresh_token",\n            }).toString(),\n            headers: {\n                \'Content-Type\': \'application/x-www-form-urlencoded\',\n                "accept": "application/json",\n            },\n        });\n        const response = await tokenResponseData.json();\n        return response;\n    };\n\n    async getIdentifier(accessToken: string) {\n        const userInfoResponse = await fetch("https://graph.microsoft.com/v1.0/me", {\n            headers: {\n                Authorization: `Bearer ${accessToken}`,\n            },\n        });\n        const response = await userInfoResponse.json();\n        return response.mail;\n    };\n\n    async revoke(accessToken: string) {\n        await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/logout", {\n            method: "POST",\n            headers: {\n                Authorization: `Bearer ${accessToken}`,\n            },\n        });\n    };\n}\n\n// Export a singleton instance of the service\nexport default new MicrosoftOauth();\n'})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>i});var s=t(6540);const o={},r=s.createContext(o);function a(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);