import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FoodCard } from "../../components/FoodCard";
const MyReviews = () => {

    const {user} = useContext(AuthContext)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        if (!user || !user.email) {
            setItems([]);
            setLoading(false);
            return;
        }

        fetch(`https://local-food-lover-network-eosin.vercel.app/my-reviews?email=${user.email}`)
        .then(res=> res.json())
        .then(data=> {
            setItems(data)
            setLoading(false)
        })

    }, [user])

if (!loading && items.length === 0) {
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 animate-fadeInUp">
          My Reviews
        </h1>
        <p className="mt-2 text-lg text-gray-600 animate-fadeInUp2">Share your thoughts and experiences!</p>
      </div>
      <div className="text-center py-10 text-xl font-semibold">
        You haven't added any reviews yet.
      </div>
    </div>
  );
}

return (
  <div>
    <div className="relative flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 animate-fadeInUp">
        My Reviews
      </h1>
      <p className="mt-2 text-lg text-gray-600 animate-fadeInUp2">Share your thoughts and experiences!</p>
    </div>
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map(item => <FoodCard key={item._id} item={item}/>)}
    </div>
  </div>
);
}

export default MyReviews;