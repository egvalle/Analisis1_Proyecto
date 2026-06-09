import { Trophy, Medal, Star, Award } from "lucide-react"

function RatingCard({ ranking, position }) {
  const renderStars = () => {
    const roundedRating =
      Math.round(
        ranking.average_rating
      )
    return (
      <div className="flex items-center gap-1">
        {
          [1, 2, 3, 4, 5].map(
            star => (
              <Star
                key={star}
                size={18}
                fill={
                  star <= roundedRating
                    ? "currentColor"
                    : "none"
                }
                className={
                  star <= roundedRating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            )
          )
        }
      </div>
    )
  }
  const getMedal = () => {
    switch (position) {
      case 1:
        return (
          <Trophy
            size={28}
            className="text-yellow-500"
          />
        )
      case 2:
        return (
          <Medal
            size={28}
            className="text-gray-400"
          />
        )
      case 3:
        return (
          <Award
            size={28}
            className="text-amber-600"
          />
        )
      default:
        return (
          <span className="font-bold text-earth">
            #{position}
          </span>
        )
    }
  }
  return (
    <div className="bg-white border border-border rounded-3xl p-6 shadow-soft hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-leaf/10 flex items-center justify-center text-2xl font-bold">
            {
              getMedal()
            }
          </div>
          <div>
            <h3 className="text-lg font-bold text-earth">
              {ranking.full_name}
            </h3>
            <p className="text-sm text-textSoft">
              {ranking.total_ratings}
              {" "}
              valoración(es)
            </p>
          </div>
        </div>
        {/* RIGHT */}
        <div className="text-right">
          <div className="flex justify-end mb-2">
            {renderStars()}
          </div>
          <p className="font-bold text-earth text-lg">
            {ranking.average_rating}
          </p>
        </div>
      </div>
      {/* FOOTER */}
      <div className="mt-5 pt-4 border-t border-border flex items-center gap-2 text-textSoft">
        <Trophy
          size={18}
          className="text-leaf"
        />
        <span className="text-sm">Ranking #{position}</span>
      </div>
    </div>
  )
}

export default RatingCard