import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
    const { _id,title, image_url, publisher, description,isPremium } = article
    return (
        <div className={isPremium? "border hover:border-blue-500 card card-compact w-96 bg-blue-100 shadow-xl p-5": "border hover:border-blue-500 card card-compact w-96 bg-base-100 shadow-xl p-5"}>
            <h1 className="my-2 text-lg font-semibold text-gray-700">{title}</h1>
            <figure><img className="h-44" src={image_url} alt={title} /></figure>
            <div className="card-body">
                <h2 className="text-lg font-semibold text-gray-700 ">Published From <span className="text-blue-500 text-xl font-bold">{publisher}</span></h2>
                <p className="text-gray-500 font-medium" title={description}>{description.substring(0,90)}...</p>
                <div className="border-b-2 border-dashed border-blue-400"></div>
                <div className="card-actions justify-end">
                    <Link to={`/article/${_id}`} className="btn btn-sm text-[#FFF] font-medium bg-[#4366d6] hover:bg-[#1743d3]">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;