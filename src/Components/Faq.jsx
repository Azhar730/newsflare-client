const Faq = () => {
    return (
        <div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    How can I subscribe to premium content?
                </div>
                <div className="collapse-content">
                    <p>To subscribe to premium content, visit the Subscription Page. Choose your desired subscription period from the dropdown menu (options include 1 minute, 5 days, or 10 days), then click the Take Subscription button. You will be redirected to the payment page to complete your subscription.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    What happens when my subscription period ends?
                </div>
                <div className="collapse-content">
                    <p>When your subscription period ends, your account will revert to a normal user status. You will need to renew your subscription to continue accessing premium content.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How can I add a publisher?
                </div>
                <div className="collapse-content">
                    <p>If you are an admin, you can add a publisher from the Admin Dashboard. Navigate to the Add Publisher page, fill in the publisher name and upload the publisher logo, then submit the form.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How can I view my own articles?
                </div>
                <div className="collapse-content">
                    <p>You can view all your articles on the My Articles page. This page displays your articles in a tabular format with details such as serial number, title, status, and options to update or delete the articles.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How do I filter articles by publisher or tags?
                </div>
                <div className="collapse-content">
                    <p>On the All Articles page, you can filter articles using the publisher and tags dropdown menus. You can also use the search field to find articles by their title. This will help you quickly find the articles that match your criteria.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How can I submit an article?
                </div>
                <div className="collapse-content">
                    <p>To submit an article, go to the Submit Article page. Fill out the required fields such as the title, upload an image, select a publisher, add tags, and write your article description. Once done, click the Submit button. Your article will be reviewed by an admin before being published.</p>
                </div>
            </div>
        </div>
    );
};

export default Faq;