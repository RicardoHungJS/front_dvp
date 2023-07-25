import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import SearchComponent from "../searchComponent/searchComponent";
import UserCardComponent from "../userCardComponent/userCardComponent";
import EndpointSavedUsersComponent from "../EndpointSavedUsersComponent/EndpointSavedUsersComponent";
import ChartComponent from "../chartComponent/chartComponent";
import { fetchHelper } from "../../helpers/fetchHelper";
import { FieldValues } from "react-hook-form";
import { UserData } from "../../interfaces/users.interface";

const MainListComponent = () => {
  const [chartData, setChartData] = useState<any>()
  const [searchedData, setSearchedData] = useState<UserData | null>(null);

  const myEndPintData: any = useFetch('http://localhost:4000/users');

  const onSubmitSearchComponet = async (searchData: FieldValues) => {
    const searchDataResponse = await fetchHelper(`https://api.github.com/search/users?q=${searchData.search}`);
    setSearchedData(searchDataResponse);
  }

  useEffect(() => {
    if (searchedData) {
      const auxData = searchedData.items.slice(0, 10)

      const getChartFollowers = async () => {
        const followersPromises = auxData.map(async (user: any) => {
          const userFollowers = await fetchHelper(user.url);
          return userFollowers
        })

        const followersData: any = await Promise.all(followersPromises);
        const auxLabels: any[] = [];
        const auxFollowers: any[] = [];

        followersData.forEach((el: any) => {
          auxLabels.push(el.login);
          auxFollowers.push(el.followers)
        });

        setChartData({ labels: auxLabels, data: auxFollowers });
      }

      getChartFollowers();
    }
  }, [searchedData])

  return (
    <div className="w-screen h-screen grid grid-cols-4 grid-rows-withHeader gap-3">
      <SearchComponent onSubmitSearch={onSubmitSearchComponet} />
      <div className="col-span-2 row-span-2 row-start-2 flex flex-wrap justify-center content-start overflow-auto scrollStyled">
        {searchedData && <h1 className="w-full text-3xl text-center my-7 font-bold">Usuarios encontrados...</h1>}
        {
          searchedData ? searchedData.items.slice(0, 10).map((user: any) => (
            <UserCardComponent key={user.id} user={user} />
          )) : <div className="w-full h-full text-6xl flex justify-center items-center text-center font-bold p-32 bg-orange-400">No se han encontrado usuarios</div>
        }
      </div>
      {myEndPintData && <EndpointSavedUsersComponent savedUsers={myEndPintData} />}
      <ChartComponent users={chartData} />
    </div>
  )
}

export default MainListComponent