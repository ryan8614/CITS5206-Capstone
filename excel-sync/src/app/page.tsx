import Header from "./components/header";
import { AntdRegistry } from '@ant-design/nextjs-registry';


export default function Home() {
  return (
    <div className="w-screen h-screen">
        <Header/>
        <div className="pt-24 bg-white text-black w-screen h-screen">
          <AntdRegistry>
            <div>Welcome to excel-sync!</div>
          </AntdRegistry>
        </div>
      </div>
  );
}
