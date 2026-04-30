(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7233,e=>{"use strict";let a=(0,e.i(75254).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",()=>a],7233)},56909,58472,e=>{"use strict";var a=e.i(75254);let t=(0,a.default)("save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);e.s(["Save",()=>t],56909);let s=(0,a.default)("code",[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]]);e.s(["Code",()=>s],58472)},20483,e=>{"use strict";var a=e.i(43476),t=e.i(78583),s=e.i(7233),r=e.i(56909),l=e.i(58472),n=e.i(71645);let i={typescript:`// TypeScript Code
interface User {
  id: string;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const myUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

console.log(greetUser(myUser));`,javascript:`// JavaScript Code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return a / b; }
}

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8`,python:`# Python Code
def calculate_factorial(n):
    """Calculate factorial of n"""
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

class DataProcessor:
    def __init__(self, name):
        self.name = name
        self.data = []
    
    def add_data(self, item):
        self.data.append(item)
    
    def process(self):
        return f"Processing {len(self.data)} items"

processor = DataProcessor("MyProcessor")
processor.add_data("item1")
print(processor.process())`,html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>My Page</title>
</head>
<body>
  <h1>Welcome to Web Development</h1>
  <p>This is a sample HTML page.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</body>
</html>`,css:`/* CSS Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}`,sql:`-- SQL Code
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
  ('John Doe', 'john@example.com'),
  ('Jane Smith', 'jane@example.com'),
  ('Bob Wilson', 'bob@example.com');

SELECT * FROM users WHERE email LIKE '%@example.com';

UPDATE users SET name = 'John Updated' WHERE id = 1;

DELETE FROM users WHERE id = 3;`};function o({}){let[e,o]=(0,n.useState)([{id:"1",name:"example.ts",content:i.typescript,language:"typescript",saved:!0}]),[d,c]=(0,n.useState)("1"),[p,m]=(0,n.useState)(!1),[x,g]=(0,n.useState)(""),h=e.find(e=>e.id===d),u=()=>{if(!x.trim())return;let a={ts:"typescript",js:"javascript",py:"python",html:"html",css:"css",sql:"sql"}[x.split(".").pop()||"txt"]||"typescript",t=i[a]||"",s={id:Date.now().toString(),name:x,content:t,language:a,saved:!0};o([...e,s]),c(s.id),g(""),m(!1)};return(0,a.jsxs)("div",{className:"flex h-full flex-col bg-gray-900 text-gray-100",children:[(0,a.jsx)("div",{className:"border-b border-gray-700 bg-gray-800 px-4 py-3",children:(0,a.jsxs)("div",{className:"flex items-center justify-between gap-2",children:[(0,a.jsxs)("h1",{className:"font-semibold flex items-center gap-2",children:[(0,a.jsx)(l.Code,{className:"h-5 w-5"}),"Code Editor"]}),(0,a.jsxs)("button",{onClick:()=>m(!0),className:"flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm",children:[(0,a.jsx)(s.Plus,{className:"h-4 w-4"}),"New File"]})]})}),p&&(0,a.jsxs)("div",{className:"border-b border-gray-700 bg-gray-800 p-3 flex gap-2",children:[(0,a.jsx)("input",{autoFocus:!0,type:"text",value:x,onChange:e=>g(e.target.value),onKeyDown:e=>{"Enter"===e.key&&u(),"Escape"===e.key&&(m(!1),g(""))},placeholder:"filename.ts",className:"flex-1 px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm"}),(0,a.jsx)("button",{onClick:u,className:"px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-sm",children:"Create"}),(0,a.jsx)("button",{onClick:()=>{m(!1),g("")},className:"px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm",children:"Cancel"})]}),(0,a.jsx)("div",{className:"border-b border-gray-700 bg-gray-800 flex overflow-x-auto",children:e.map(s=>(0,a.jsxs)("div",{className:`flex items-center gap-2 px-4 py-2 border-r border-gray-700 cursor-pointer transition ${d===s.id?"bg-gray-900 border-b-2 border-blue-500":"hover:bg-gray-700"}`,onClick:()=>c(s.id),children:[(0,a.jsx)(t.FileText,{className:`h-4 w-4 ${{typescript:"text-blue-500",javascript:"text-yellow-500",python:"text-green-500",html:"text-orange-500",css:"text-purple-500",sql:"text-pink-500"}[s.language]||"text-gray-500"}`}),(0,a.jsx)("span",{className:"text-sm",children:s.name}),!s.saved&&(0,a.jsx)("span",{className:"text-red-500",children:"●"}),(0,a.jsx)("button",{onClick:a=>{var t;let r;a.stopPropagation(),t=s.id,o(r=e.filter(e=>e.id!==t)),d===t&&r.length>0&&c(r[0].id)},className:"hover:text-red-500 ml-1",children:"×"})]},s.id))}),(0,a.jsx)("div",{className:"flex-1 flex flex-col overflow-hidden",children:h?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"border-b border-gray-700 bg-gray-800 px-4 py-2 flex items-center justify-between",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 text-xs opacity-70",children:[(0,a.jsx)("span",{children:h.language.toUpperCase()}),(0,a.jsx)("span",{children:"|"}),(0,a.jsxs)("span",{children:[h.content.length," chars"]})]}),(0,a.jsxs)("button",{onClick:()=>{h&&o(e.map(e=>e.id===d?{...e,saved:!0}:e))},disabled:h.saved,className:"flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm",children:[(0,a.jsx)(r.Save,{className:"h-4 w-4"}),"Save"]})]}),(0,a.jsxs)("div",{className:"flex-1 overflow-hidden flex",children:[(0,a.jsx)("textarea",{value:h.content,onChange:a=>{var t;return t=a.target.value,void o(e.map(e=>e.id===d?{...e,content:t,saved:!1}:e))},className:"flex-1 bg-gray-900 text-gray-100 font-mono text-sm p-4 overflow-auto resize-none",spellCheck:"false"}),(0,a.jsx)("div",{className:"w-12 bg-gray-800 border-l border-gray-700 text-right text-xs text-gray-600 p-4 overflow-auto",children:h.content.split("\n").map((e,t)=>(0,a.jsx)("div",{className:"h-[1.5em] leading-[1.5em]",children:t+1},t))})]})]}):(0,a.jsx)("div",{className:"flex items-center justify-center h-full text-center",children:(0,a.jsxs)("div",{children:[(0,a.jsx)(l.Code,{className:"mx-auto mb-2 h-8 w-8 opacity-30"}),(0,a.jsx)("p",{className:"text-sm opacity-60",children:"No files open"})]})})}),(0,a.jsxs)("div",{className:"border-t border-gray-700 bg-gray-800 px-4 py-2 text-xs text-gray-400 flex justify-between",children:[(0,a.jsx)("div",{children:h&&`Ln ${h.content.split("\n").length}, Col ${h.content.split("\n").pop()?.length||0}`}),(0,a.jsxs)("div",{children:["UTF-8 • ",h?.language.toUpperCase()]})]})]})}e.s(["CodeEditorApp",()=>o])},13340,e=>{e.n(e.i(20483))}]);