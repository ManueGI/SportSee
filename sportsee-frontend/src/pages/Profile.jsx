import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { useAppContext } from '../contexts'

function Profile() {
  const navigate = useNavigate()
  const { setSelectedUserId } = useAppContext()

  const handleUserSelect = (userId) => {
    setSelectedUserId(Number(userId))
    navigate('/')
  }

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Connexion SportSee</h1>
        <p className="login__subtitle">Sélectionnez votre profil utilisateur :</p>

        <div className="login__users">
          <button
            className="login__user-btn"
            onClick={() => handleUserSelect(12)}
          >
            <div className="login__user-info">
              <h3>Karl Dovineau</h3>
              <p>ID: 12</p>
            </div>
          </button>

          <button
            className="login__user-btn"
            onClick={() => handleUserSelect(18)}
          >
            <div className="login__user-info">
              <h3>Cecilia Ratorez</h3>
              <p>ID: 18</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
