import Input from '../form/Input';
import EditParticipationForm from './EditParticipationForm';

function ParticipationGoalForm({ closeForm, nbMaxRaces, participation }) {
    const maxPoints = nbMaxRaces * 15;
    const GOAL_VALIDATION = `Veuillez entrer un nombre compris entre 1 et ${maxPoints}`;

    return (
        <EditParticipationForm
            closeForm={closeForm}
            participation={participation}
        >
            <Input
                label="Objectif"
                name="goal"
                type="number"
                autoFocus
                defaultValue={participation.goal}
                validationSchema={{
                    min: {
                        value: 1,
                        message: GOAL_VALIDATION,
                    },
                    max: {
                        value: maxPoints,
                        message: GOAL_VALIDATION,
                    },
                }}
            />
        </EditParticipationForm>
    );
}

export default ParticipationGoalForm;
