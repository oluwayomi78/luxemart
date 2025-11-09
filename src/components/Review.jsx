import { useState } from 'react';
import { Star } from 'lucide-react';

// A simple star rating input component
const StarRatingInput = ({ rating, setRating }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    type="button" // Important: prevents form submission on click
                    key={star}
                    onClick={() => setRating(star)}
                    className="cursor-pointer"
                >
                    <Star 
                        size={24} 
                        fill={star <= rating ? 'currentColor' : 'none'} 
                        className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                </button>
            ))}
        </div>
    );
};

// The main review form
const ReviewForm = ({ productId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || !comment) {
            setError('Please provide a rating and a comment.');
            return;
        }

        setLoading(true);
        setError(null);

        // Get token from localStorage (same logic as your other components)
        let token = null;
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            token = JSON.parse(userInfoString).token;
        }

        if (!token) {
            setError('You must be logged in to leave a review.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`http://localhost:4300/api/products/${productId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ rating, title, comment }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to submit review.');
            }

            const newReview = await res.json();
            
            onReviewSubmitted(newReview); 

            setRating(0);
            setTitle('');
            setComment('');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-8 p-6 border rounded-lg">
            <h3 className="text-xl font-semibold">Write a Customer Review</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                <StarRatingInput rating={rating} setRating={setRating} />
            </div>
            <div>
                <label htmlFor="review-title" className="block text-sm font-medium text-gray-700">
                    Review Title (Optional)
                </label>
                <input
                    type="text"
                    id="review-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="What's most important to know?"
                />
            </div>
            <div>
                <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700">
                    Your Comment
                </label>
                <textarea
                    id="review-comment"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="What did you like or dislike?"
                />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
                {loading ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
};

export default ReviewForm;