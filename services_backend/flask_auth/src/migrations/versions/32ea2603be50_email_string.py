"""Email String

Revision ID: 32ea2603be50
Revises: 4aca8c38af63
Create Date: 2022-06-20 18:01:51.369925

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '32ea2603be50'
down_revision = '4aca8c38af63'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'social_account', ['id'])
    op.add_column('users', sa.Column('email', sa.String(), nullable=False))
    op.create_unique_constraint(None, 'users', ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_column('users', 'email')
    op.drop_constraint(None, 'social_account', type_='unique')
    op.drop_constraint('session_date', 'sessions', type_='unique')
    # ### end Alembic commands ###
