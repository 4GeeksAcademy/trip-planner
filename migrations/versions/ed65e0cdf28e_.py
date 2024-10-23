"""empty message

Revision ID: ed65e0cdf28e
Revises: 2aad6ca96672
Create Date: 2024-10-23 19:21:46.455994

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ed65e0cdf28e'
down_revision = '2aad6ca96672'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('viajes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('trip_image_url', sa.String(length=360), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('viajes', schema=None) as batch_op:
        batch_op.drop_column('trip_image_url')

    # ### end Alembic commands ###