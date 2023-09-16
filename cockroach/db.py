import psycopg2
from datetime import datetime
from dotenv import dotenv_values


class PostgresUploader:
    def __init__(self, url):
        self.url = url

    def create_table(self):
        try:
            # Connect to the database
            conn = psycopg2.connect(self.url)
            cursor = conn.cursor()

            # Prepare the SQL statement to create the table if it doesn't exist
            create_table_sql = """
                CREATE TABLE IF NOT EXISTS urls (
                    id SERIAL PRIMARY KEY,
                    url TEXT NOT NULL,
                    upload_time TIMESTAMP NOT NULL
                )
            """

            # Execute the SQL statement to create the table
            cursor.execute(create_table_sql)

            # Commit the transaction
            conn.commit()

            print("Table created successfully.")
        except psycopg2.Error as e:
            print("Error creating table:", e)

    def upload_url(self, video_url):
        try:
            # Connect to the database
            conn = psycopg2.connect(self.url)
            cursor = conn.cursor()

            # Prepare the SQL statement
            sql = "INSERT INTO urls (url, upload_time) VALUES (%s, %s)"
            timestamp = datetime.now()

            # Execute the SQL statement
            cursor.execute(sql, (video_url, timestamp))

            # Commit the transaction and close the connection
            conn.commit()
            conn.close()

            print("URL uploaded successfully.")
        except psycopg2.Error as e:
            print("Error uploading URL:", e)


env_config = dotenv_values(".env")
cock_url = env_config.get('COCK_URL')

url = cock_url

uploader = PostgresUploader(url)
uploader.upload_url("joemama.com")