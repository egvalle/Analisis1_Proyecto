import {
  Calendar,
  User,
  Package
} from "lucide-react"

function HistoryCard({
  interaction,
  isProducer
}) {

  const formattedDate =
    new Date(
      interaction.created_at
    ).toLocaleString()

  return (
    <div className="bg-white border border-border rounded-3xl p-6 shadow-soft">

      {/* PRODUCT */}
      <div className="flex items-center gap-3 mb-4">

        <Package
          size={20}
          className="text-leaf"
        />

        <div>
          <h3 className="font-bold text-earth">
            {interaction.product_title}
          </h3>

          <p className="text-sm text-textSoft">
            Producto consultado
          </p>
        </div>

      </div>

      {/* PERSON */}
      <div className="flex items-center gap-3 mb-4">

        <User
          size={20}
          className="text-leaf"
        />

        <div>

          {
            isProducer
              ? (
                <>
                  <p className="font-medium text-earth">
                    {interaction.buyer_name}
                  </p>

                  <p className="text-sm text-textSoft">
                    Comprador interesado
                  </p>
                </>
              )
              : (
                <>
                  <p className="font-medium text-earth">
                    {interaction.producer_name}
                  </p>

                  <p className="text-sm text-textSoft">
                    Productor contactado
                  </p>
                </>
              )
          }

        </div>

      </div>

      {/* DATE */}
      <div className="flex items-center gap-3">

        <Calendar
          size={20}
          className="text-leaf"
        />

        <div>

          <p className="font-medium text-earth">
            {formattedDate}
          </p>

          <p className="text-sm text-textSoft">
            Fecha de interacción
          </p>

        </div>

      </div>

    </div>
  )
}

export default HistoryCard