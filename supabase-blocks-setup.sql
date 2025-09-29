-- Run this in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS blocks CASCADE;
DROP TABLE IF EXISTS options CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TYPE block_type AS ENUM ('heading', 'question', 'button', 'footer');

CREATE TABLE quizzes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    published BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE blocks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type block_type NOT NULL,
    "order" INTEGER NOT NULL,
    properties JSONB NOT NULL DEFAULT '{}',
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_blocks_quiz_id ON blocks(quiz_id);
CREATE INDEX IF NOT EXISTS idx_blocks_order ON blocks("order");
CREATE INDEX IF NOT EXISTS idx_quizzes_updated_at ON quizzes("updatedAt");

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quizzes_updated_at 
    BEFORE UPDATE ON quizzes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO quizzes (id, title, published) VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', 'Customer Satisfaction Survey', true),
    ('550e8400-e29b-41d4-a716-446655440002', 'Product Knowledge Quiz', false);

INSERT INTO blocks (id, type, "order", properties, quiz_id) VALUES 
    ('550e8400-e29b-41d4-a716-446655440011', 'heading', 0, '{"text": "Customer Satisfaction Survey", "level": 1}', '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440012', 'question', 1, '{"text": "How satisfied are you with our service?", "questionType": "single", "options": ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]}', '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440013', 'question', 2, '{"text": "What could we improve?", "questionType": "text", "placeholder": "Your suggestions..."}', '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440014', 'button', 3, '{"text": "Submit Survey", "type": "submit"}', '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440015', 'footer', 4, '{"text": "Thank you for your feedback!"}', '550e8400-e29b-41d4-a716-446655440001'),
    
    ('550e8400-e29b-41d4-a716-446655440021', 'heading', 0, '{"text": "Product Knowledge Quiz", "level": 1}', '550e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440022', 'question', 1, '{"text": "Which features are most important to you?", "questionType": "multi", "options": ["Price", "Quality", "Design", "Support"]}', '550e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440023', 'button', 2, '{"text": "Next Question", "type": "next"}', '550e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440024', 'footer', 3, '{"text": "Quiz powered by Quiz Builder"}', '550e8400-e29b-41d4-a716-446655440002');

SELECT 'Quizzes created:' as info, count(*) as count FROM quizzes;
SELECT 'Blocks created:' as info, count(*) as count FROM blocks;
