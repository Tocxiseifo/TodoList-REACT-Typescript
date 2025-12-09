import { createContext } from "react";
export  interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

export const InterfaceContext = createContext<Todo | null>(null)

export default function ProviderInterFace({children}:{children:any}, value: Todo | null) {
    return(
        <InterfaceContext.Provider value={value}>
            {children}
        </InterfaceContext.Provider>
    )
}